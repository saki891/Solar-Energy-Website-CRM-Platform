from datetime import datetime, timezone
from typing import Optional, Dict, Any, List
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.lead import Lead
from app.models.customer import Customer
from app.models.site_survey import SiteSurvey
from app.models.project import Project
from app.models.activity import Activity
from app.services.dashboard_service import format_relative_time


class CRMService:
    @staticmethod
    def record_activity(
        db: Session,
        entity_type: str,
        entity_id: int,
        action: str,
        title: str,
        description: Optional[str] = None,
        customer_id: Optional[int] = None,
        customer_name: Optional[str] = None,
        user_id: Optional[int] = None,
        status_val: Optional[str] = None,
    ) -> Activity:
        """Create and persist an activity audit log entry."""
        activity = Activity(
            entity_type=entity_type,
            entity_id=entity_id,
            action=action,
            title=title,
            description=description,
            customer_id=customer_id,
            customer_name=customer_name,
            user_id=user_id,
            status=status_val,
        )
        db.add(activity)
        return activity

    @staticmethod
    def find_or_create_customer_for_lead(db: Session, lead: Lead) -> Customer:
        """
        Idempotently find an existing customer or create a new Customer record from a Lead.
        Uses ID, verified email, or phone.
        """
        # 1. Existing customer by linked customer_id
        if lead.customer_id:
            existing = db.query(Customer).filter(Customer.id == lead.customer_id).first()
            if existing:
                return existing

        # 2. Existing customer by email
        if lead.email and lead.email.strip():
            existing = db.query(Customer).filter(Customer.email.ilike(lead.email.strip())).first()
            if existing:
                lead.customer_id = existing.id
                return existing

        # 3. Existing customer by phone / contact
        target_phone = (lead.phone or lead.contact or "").strip()
        if target_phone:
            existing = (
                db.query(Customer)
                .filter(
                    (Customer.phone == target_phone)
                    | (Customer.contact == target_phone)
                )
                .first()
            )
            if existing:
                lead.customer_id = existing.id
                return existing

        # 4. Create new customer
        customer = Customer(
            name=lead.name.strip(),
            contact=lead.contact.strip(),
            email=lead.email.strip() if lead.email else None,
            phone=lead.phone.strip() if lead.phone else lead.contact.strip(),
            location=lead.location.strip(),
            property_type=lead.property_type or "Residential",
            status="Active",
            customer_since=datetime.now(timezone.utc).strftime("%d %b %Y"),
            assigned_user_id=lead.assigned_user_id,
        )
        db.add(customer)
        db.flush()  # populate customer.id

        lead.customer_id = customer.id

        CRMService.record_activity(
            db=db,
            entity_type="customer",
            entity_id=customer.id,
            action="created",
            title=f"Customer created from lead: {lead.name}",
            description=f"Auto-generated customer account for lead #{lead.id}",
            customer_id=customer.id,
            customer_name=customer.name,
            user_id=lead.assigned_user_id,
            status_val="Active",
        )

        return customer

    @staticmethod
    def lead_contacted_workflow(db: Session, lead_id: int, user_id: Optional[int] = None) -> Lead:
        """
        When a lead is contacted:
        1. Keep the lead
        2. Find or create linked customer
        3. Set lead.customer_id and lead.status = 'Contacted'
        4. Record activity
        """
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

        customer = CRMService.find_or_create_customer_for_lead(db, lead)
        lead.status = "Contacted"

        CRMService.record_activity(
            db=db,
            entity_type="lead",
            entity_id=lead.id,
            action="contacted",
            title=f"Lead contacted: {lead.name}",
            description=f"Lead marked as Contacted. Linked to Customer #{customer.id}",
            customer_id=customer.id,
            customer_name=customer.name,
            user_id=user_id or lead.assigned_user_id,
            status_val="Contacted",
        )

        db.commit()
        db.refresh(lead)
        return lead

    @staticmethod
    def lead_schedule_survey_workflow(
        db: Session,
        lead_id: int,
        survey_data: Dict[str, Any],
        user_id: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        When a lead enters Site Survey:
        1. Link/create customer
        2. Create SiteSurvey linked to customer and lead
        3. Advance lead status to 'Site Survey'
        4. Record activity
        """
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

        customer = CRMService.find_or_create_customer_for_lead(db, lead)

        # Prevent duplicate survey scheduling for exact same date/time
        survey_date = survey_data.get("survey_date", "").strip()
        time_slot = survey_data.get("time_slot", "10:00 AM").strip()

        existing_survey = (
            db.query(SiteSurvey)
            .filter(
                SiteSurvey.customer_id == customer.id,
                SiteSurvey.survey_date == survey_date,
                SiteSurvey.time_slot == time_slot,
            )
            .first()
        )

        if existing_survey:
            survey = existing_survey
            if not survey.lead_id:
                survey.lead_id = lead.id
        else:
            survey = SiteSurvey(
                customer_name=customer.name,
                location=survey_data.get("location") or lead.location,
                property_type=survey_data.get("property_type") or lead.property_type or "Residential",
                survey_date=survey_date or datetime.now(timezone.utc).strftime("%d %b %Y"),
                time_slot=time_slot,
                assigned_to=survey_data.get("assigned_to", "Rahul").strip(),
                status="Scheduled",
                customer_id=customer.id,
                lead_id=lead.id,
                assigned_user_id=user_id or lead.assigned_user_id,
                roof_information=survey_data.get("roof_information"),
                capacity_estimate=survey_data.get("capacity_estimate"),
                notes=survey_data.get("notes"),
            )
            db.add(survey)
            db.flush()

            CRMService.record_activity(
                db=db,
                entity_type="site_survey",
                entity_id=survey.id,
                action="scheduled",
                title=f"Site survey scheduled for {customer.name}",
                description=f"Survey on {survey.survey_date} at {survey.time_slot} assigned to {survey.assigned_to}",
                customer_id=customer.id,
                customer_name=customer.name,
                user_id=user_id or lead.assigned_user_id,
                status_val="Scheduled",
            )

        lead.status = "Site Survey"

        CRMService.record_activity(
            db=db,
            entity_type="lead",
            entity_id=lead.id,
            action="status_changed",
            title=f"Lead moved to Site Survey: {lead.name}",
            customer_id=customer.id,
            customer_name=customer.name,
            user_id=user_id or lead.assigned_user_id,
            status_val="Site Survey",
        )

        db.commit()
        db.refresh(lead)
        db.refresh(survey)
        return {"lead": lead, "survey": survey, "customer": customer}

    @staticmethod
    def lead_convert_workflow(
        db: Session,
        lead_id: int,
        project_data: Optional[Dict[str, Any]] = None,
        user_id: Optional[int] = None,
    ) -> Dict[str, Any]:
        """
        When a lead becomes Converted:
        1. Ensure customer exists and is linked
        2. Prevent duplicate project creation if project with source_lead_id already exists
        3. Create Project with customer_id and source_lead_id
        4. Link any existing surveys for this lead to the project
        5. Mark lead as 'Converted'
        6. Record activities
        """
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

        customer = CRMService.find_or_create_customer_for_lead(db, lead)
        p_data = project_data or {}

        # Check if project already created from this lead (duplicate prevention)
        existing_project = db.query(Project).filter(Project.source_lead_id == lead.id).first()
        if not existing_project and customer.id:
            # Check by customer and name if specified
            p_name = p_data.get("project_name") or f"{customer.name} Solar Project"
            existing_project = db.query(Project).filter(
                Project.customer_id == customer.id,
                Project.name == p_name,
            ).first()

        if existing_project:
            project = existing_project
            if not project.source_lead_id:
                project.source_lead_id = lead.id
        else:
            # Check if there is an existing completed or scheduled survey for roof/capacity info
            survey = db.query(SiteSurvey).filter(
                (SiteSurvey.lead_id == lead.id) | (SiteSurvey.customer_id == customer.id)
            ).order_by(desc(SiteSurvey.created_at)).first()

            capacity = p_data.get("capacity") or (survey.capacity_estimate if survey and survey.capacity_estimate else "10 kW")
            capacity_kw = p_data.get("capacity_kw")
            if capacity_kw is None:
                try:
                    num_str = "".join(ch for ch in str(capacity) if ch.isdigit() or ch == ".")
                    capacity_kw = float(num_str) if num_str else 10.0
                except Exception:
                    capacity_kw = 10.0

            project = Project(
                name=p_data.get("project_name") or f"{customer.name} Solar Project",
                category=p_data.get("category") or lead.property_type or "Residential",
                location=p_data.get("location") or lead.location,
                capacity=capacity,
                capacity_kw=capacity_kw,
                status=p_data.get("status") or "In Progress",
                customer_id=customer.id,
                source_lead_id=lead.id,
                assigned_user_id=user_id or lead.assigned_user_id,
                estimated_cost=p_data.get("estimated_cost") or lead.estimated_value or (capacity_kw * 50000.0),
                actual_cost=p_data.get("actual_cost"),
                is_public=p_data.get("is_public", True),
            )
            db.add(project)
            db.flush()

            # Link survey to project if exists
            if survey and not survey.project_id:
                survey.project_id = project.id

            CRMService.record_activity(
                db=db,
                entity_type="project",
                entity_id=project.id,
                action="created",
                title=f"Project created: {project.name}",
                description=f"Solar installation project initialized from converted lead #{lead.id}",
                customer_id=customer.id,
                customer_name=customer.name,
                user_id=user_id or lead.assigned_user_id,
                status_val=project.status,
            )

        lead.status = "Converted"

        CRMService.record_activity(
            db=db,
            entity_type="lead",
            entity_id=lead.id,
            action="converted",
            title=f"Lead converted: {lead.name}",
            description=f"Lead converted to project '{project.name}'",
            customer_id=customer.id,
            customer_name=customer.name,
            user_id=user_id or lead.assigned_user_id,
            status_val="Converted",
        )

        db.commit()
        db.refresh(lead)
        db.refresh(project)
        return {"lead": lead, "project": project, "customer": customer}

    @staticmethod
    def get_customer_overview(db: Session, customer_id: int) -> Dict[str, Any]:
        """Fetch central customer record and all related CRM data by IDs."""
        customer = db.query(Customer).filter(Customer.id == customer_id).first()
        if not customer:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found")

        # Related Leads
        leads = (
            db.query(Lead)
            .filter(Lead.customer_id == customer.id)
            .order_by(desc(Lead.created_at))
            .all()
        )

        # Related Surveys
        surveys = (
            db.query(SiteSurvey)
            .filter(SiteSurvey.customer_id == customer.id)
            .order_by(desc(SiteSurvey.created_at))
            .all()
        )

        # Related Projects
        projects = (
            db.query(Project)
            .filter(Project.customer_id == customer.id)
            .order_by(desc(Project.created_at))
            .all()
        )

        # Related Activities
        activities = (
            db.query(Activity)
            .filter(Activity.customer_id == customer.id)
            .order_by(desc(Activity.created_at))
            .limit(25)
            .all()
        )

        leads_data = [
            {
                "id": l.id,
                "name": l.name,
                "contact": l.contact,
                "email": l.email,
                "phone": l.phone,
                "location": l.location,
                "property_type": l.property_type,
                "source": l.source,
                "status": l.status,
                "notes": l.notes,
                "estimated_value": l.estimated_value,
                "created_at": l.created_at.isoformat() if l.created_at else None,
                "date": l.created_at.strftime("%d %b %Y") if l.created_at else "Recently",
            }
            for l in leads
        ]

        surveys_data = [
            {
                "id": s.id,
                "customer_name": s.customer_name,
                "location": s.location,
                "property_type": s.property_type,
                "survey_date": s.survey_date,
                "time_slot": s.time_slot,
                "assigned_to": s.assigned_to,
                "status": s.status,
                "roof_information": s.roof_information,
                "capacity_estimate": s.capacity_estimate,
                "notes": s.notes,
                "project_id": s.project_id,
                "lead_id": s.lead_id,
                "created_at": s.created_at.isoformat() if s.created_at else None,
            }
            for s in surveys
        ]

        projects_data = [
            {
                "id": p.id,
                "name": p.name,
                "category": p.category,
                "location": p.location,
                "capacity": p.capacity,
                "capacity_kw": p.capacity_kw,
                "status": p.status,
                "customer_id": p.customer_id,
                "source_lead_id": p.source_lead_id,
                "estimated_cost": p.estimated_cost,
                "actual_cost": p.actual_cost,
                "start_date": p.start_date.isoformat() if p.start_date else None,
                "completion_date": p.completion_date.isoformat() if p.completion_date else None,
                "created_at": p.created_at.isoformat() if p.created_at else None,
            }
            for p in projects
        ]

        activities_data = [
            {
                "id": a.id,
                "entity_type": a.entity_type,
                "entity_id": a.entity_id,
                "action": a.action,
                "title": a.title,
                "description": a.description,
                "customer_id": a.customer_id,
                "customer_name": a.customer_name,
                "status": a.status,
                "created_at": a.created_at.isoformat() if a.created_at else None,
                "time_ago": format_relative_time(a.created_at),
            }
            for a in activities
        ]

        return {
            "id": customer.id,
            "name": customer.name,
            "contact": customer.contact,
            "email": customer.email,
            "phone": customer.phone,
            "location": customer.location,
            "property_type": customer.property_type,
            "status": customer.status,
            "customer_since": customer.customer_since,
            "assigned_user_id": customer.assigned_user_id,
            "total_projects": len(projects),
            "created_at": customer.created_at,
            "updated_at": customer.updated_at,
            "leads": leads_data,
            "site_surveys": surveys_data,
            "projects": projects_data,
            "activities": activities_data,
        }
