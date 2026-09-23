from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc

from app.core.database import get_db
from app.dependencies.auth import get_optional_current_user, is_staff_user, require_roles
from app.models.user import User
from app.models.project import Project
from app.models.customer import Customer
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.schemas.common import APIResponse

router = APIRouter(prefix="/projects", tags=["Projects Management"])
STAFF_ROLES = ["Admin", "Manager", "Sales Rep", "Support"]
NULLABLE_PROJECT_FIELDS = {
    "capacity_kw",
    "customer_id",
    "assigned_user_id",
    "image_url",
    "estimated_cost",
    "actual_cost",
    "start_date",
    "completion_date",
}


def validate_user_reference(db: Session, user_id: Optional[int]) -> None:
    if user_id is None:
        return
    exists = db.query(User.id).filter(User.id == user_id).first()
    if not exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Assigned user not found")


def validate_customer_reference(db: Session, customer_id: Optional[int]) -> None:
    if customer_id is None:
        return
    exists = db.query(Customer.id).filter(Customer.id == customer_id).first()
    if not exists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Customer not found")


def apply_project_update(project: Project, update_data: dict) -> None:
    for field, val in update_data.items():
        if val is None and field not in NULLABLE_PROJECT_FIELDS:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"{field} cannot be null",
            )
        setattr(project, field, val)


@router.get(
    "",
    response_model=APIResponse[List[ProjectResponse]],
    summary="List all projects with category and status filter",
)
def list_projects(
    search: Optional[str] = Query(None, description="Search by name, location, capacity"),
    category: Optional[str] = Query(None, description="Filter by category (Residential, Commercial, Industrial)"),
    status_filter: Optional[str] = Query(None, alias="status", description="Filter by status"),
    is_public: Optional[bool] = Query(None, description="Filter public showcase projects"),
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
):
    query = db.query(Project)
    is_staff = is_staff_user(current_user)

    if not is_staff:
        query = query.filter(Project.is_public == True)

    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Project.name.ilike(s),
                Project.location.ilike(s),
                Project.capacity.ilike(s),
            )
        )

    if category and category not in ["All", "All Categories"]:
        query = query.filter(Project.category.ilike(category))

    if status_filter and status_filter not in ["All", "All Status", "All Statuses"]:
        query = query.filter(Project.status.ilike(status_filter))

    if is_public is not None and is_staff:
        query = query.filter(Project.is_public == is_public)

    projects = query.order_by(desc(Project.created_at)).all()
    
    items = []
    for p in projects:
        resp = ProjectResponse.model_validate(p)
        if p.customer:
            resp.customer_name = p.customer.name
        items.append(resp)

    return APIResponse(success=True, message="Projects retrieved", data=items)


@router.post(
    "",
    response_model=APIResponse[ProjectResponse],
    status_code=status.HTTP_201_CREATED,
    summary="Create a new project",
)
def create_project(
    request: ProjectCreate,
    current_user: User = Depends(require_roles(STAFF_ROLES)),
    db: Session = Depends(get_db),
):
    validate_customer_reference(db, request.customer_id)
    validate_user_reference(db, request.assigned_user_id)

    project = Project(
        name=request.name.strip(),
        category=request.category,
        location=request.location.strip(),
        capacity=request.capacity.strip(),
        capacity_kw=request.capacity_kw,
        status=request.status or "In Progress",
        customer_id=request.customer_id,
        assigned_user_id=request.assigned_user_id,
        image_url=request.image_url,
        is_public=request.is_public,
        estimated_cost=request.estimated_cost,
        actual_cost=request.actual_cost,
        start_date=request.start_date,
        completion_date=request.completion_date,
    )
    db.add(project)
    db.commit()
    db.refresh(project)

    resp = ProjectResponse.model_validate(project)
    if project.customer:
        resp.customer_name = project.customer.name
    return APIResponse(success=True, message="Project created successfully", data=resp)


@router.get(
    "/{project_id}",
    response_model=APIResponse[ProjectResponse],
    summary="Get project details by ID",
)
def get_project(
    project_id: int,
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    is_staff = is_staff_user(current_user)
    if not project.is_public and not is_staff:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    resp = ProjectResponse.model_validate(project)
    if project.customer:
        resp.customer_name = project.customer.name
    return APIResponse(success=True, data=resp)


@router.patch(
    "/{project_id}",
    response_model=APIResponse[ProjectResponse],
    summary="Update project details",
)
def update_project(
    project_id: int,
    request: ProjectUpdate,
    current_user: User = Depends(require_roles(STAFF_ROLES)),
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    update_data = request.model_dump(exclude_unset=True)
    validate_customer_reference(db, update_data.get("customer_id"))
    validate_user_reference(db, update_data.get("assigned_user_id"))
    apply_project_update(project, update_data)

    db.commit()
    db.refresh(project)

    resp = ProjectResponse.model_validate(project)
    if project.customer:
        resp.customer_name = project.customer.name
    return APIResponse(success=True, message="Project updated successfully", data=resp)


@router.delete(
    "/{project_id}",
    response_model=APIResponse[bool],
    summary="Delete project",
)
def delete_project(
    project_id: int,
    current_user: User = Depends(require_roles(["Admin", "Manager"])),
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    db.delete(project)
    db.commit()
    return APIResponse(success=True, message="Project deleted successfully", data=True)
