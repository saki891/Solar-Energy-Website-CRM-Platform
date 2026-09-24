from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.dependencies.auth import require_roles
from app.models.user import User
from app.schemas.dashboard import DashboardSummaryResponse
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get(
    "/summary",
    response_model=DashboardSummaryResponse,
    summary="Get real-time dashboard analytics and statistics",
    description="Returns stat cards, leads trend overview, leads by source distribution, recent leads, and recent activities calculated directly from the database.",
)
def get_dashboard_summary(
    current_user: User = Depends(require_roles(["Admin", "Manager", "Sales Rep", "Support"])),
    db: Session = Depends(get_db),
):
    return DashboardService.get_summary(db)
