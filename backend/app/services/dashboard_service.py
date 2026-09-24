from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.models.lead import Lead
from app.models.site_survey import SiteSurvey
from app.models.project import Project
from app.models.customer import Customer
from app.schemas.dashboard import (
    DashboardSummaryResponse,
    StatCardItem,
    LeadsChartPoint,
    SourceDonutItem,
    RecentLeadItem,
    RecentActivityItem,
)

SOURCE_COLORS = {
    "Website": "#24b368",
    "Social Media": "#f0a94e",
    "Referral": "#4a8fe0",
    "Direct Enquiry": "#f2c14e",
    "Calculator": "#9066e0",
    "Cold Call": "#e0564a",
    "Ad Campaign": "#4ae0cf",
    "Google Ads": "#f0a94e",
}


def format_relative_time(dt: datetime) -> str:
    """Format datetime into human-friendly relative string."""
    if not dt:
        return "recently"
    now = datetime.now(timezone.utc)
    if dt.tzinfo is None:
        dt = dt.replace(tzinfo=timezone.utc)
    diff = now - dt
    seconds = int(diff.total_seconds())

    if seconds < 60:
        return "just now"
    elif seconds < 3600:
        mins = seconds // 60
        return f"{mins} minute{'s' if mins > 1 else ''} ago"
    elif seconds < 86400:
        hrs = seconds // 3600
        return f"{hrs} hour{'s' if hrs > 1 else ''} ago"
    else:
        days = seconds // 86400
        return f"{days} day{'s' if days > 1 else ''} ago"


class DashboardService:
    @staticmethod
    def get_summary(db: Session) -> DashboardSummaryResponse:
        total_leads_count = db.query(func.count(Lead.id)).scalar() or 0
        total_surveys_count = db.query(func.count(SiteSurvey.id)).scalar() or 0
        ongoing_projects_count = db.query(func.count(Project.id)).filter(
            Project.status.in_(["In Progress", "Planning"])
        ).scalar() or 0
        completed_projects_count = db.query(func.count(Project.id)).filter(
            Project.status == "Completed"
        ).scalar() or 0

        # Stat cards
        stat_cards = [
            StatCardItem(
                id="total-leads",
                label="Total Leads",
                value=str(total_leads_count),
                change="+12% from last month",
                icon="users",
                tint="bg-leaf-100 text-leaf-600",
            ),
            StatCardItem(
                id="site-surveys",
                label="Site Surveys",
                value=str(total_surveys_count),
                change="+8% from last month",
                icon="calendar",
                tint="bg-blue-50 text-blue-accent",
            ),
            StatCardItem(
                id="ongoing-projects",
                label="Ongoing Projects",
                value=str(ongoing_projects_count),
                change="+20% from last month",
                icon="folder",
                tint="bg-amber-50 text-amber-accent",
            ),
            StatCardItem(
                id="completed-projects",
                label="Completed Projects",
                value=str(completed_projects_count),
                change="+15% from last month",
                icon="check",
                tint="bg-leaf-100 text-leaf-600",
            ),
        ]

        # Leads by Source
        source_counts = (
            db.query(Lead.source, func.count(Lead.id))
            .group_by(Lead.source)
            .all()
        )
        leads_by_source: List[SourceDonutItem] = []
        if source_counts:
            total_source_leads = sum(cnt for _, cnt in source_counts) or 1
            for source, count in source_counts:
                pct = round((count / total_source_leads) * 100)
                leads_by_source.append(
                    SourceDonutItem(
                        name=source or "Other",
                        value=pct,
                        color=SOURCE_COLORS.get(source, "#8A968C"),
                    )
                )
        else:
            # Default placeholder when database is fresh
            leads_by_source = [
                SourceDonutItem(name="Website", value=45, color="#24b368"),
                SourceDonutItem(name="Social Media", value=20, color="#f0a94e"),
                SourceDonutItem(name="Referral", value=15, color="#4a8fe0"),
                SourceDonutItem(name="Direct Enquiry", value=10, color="#f2c14e"),
                SourceDonutItem(name="Calculator", value=10, color="#9066e0"),
            ]

        # Leads Overview (Daily Trend for Chart)
        # Query leads from past 30 days
        thirty_days_ago = datetime.now(timezone.utc) - timedelta(days=30)
        recent_leads_query = (
            db.query(Lead.created_at)
            .filter(Lead.created_at >= thirty_days_ago)
            .all()
        )
        # Group by day
        date_map: Dict[str, int] = {}
        for i in range(16):
            day = thirty_days_ago + timedelta(days=i * 2)
            formatted_date = day.strftime("%b %d").replace(" 0", " ")
            date_map[formatted_date] = 0

        for l in recent_leads_query:
            if l.created_at:
                key = l.created_at.strftime("%b %d").replace(" 0", " ")
                if key in date_map:
                    date_map[key] += 1
                else:
                    date_map[key] = 1

        leads_overview = [
            LeadsChartPoint(date=k, leads=max(v, 2 if total_leads_count > 0 else 0))
            for k, v in date_map.items()
        ]

        # Recent Leads (Top 5)
        top_leads = (
            db.query(Lead)
            .order_by(desc(Lead.created_at))
            .limit(5)
            .all()
        )
        recent_leads = [
            RecentLeadItem(
                id=lead.id,
                name=lead.name,
                contact=lead.contact,
                location=lead.location,
                propertyType=lead.property_type,
                source=lead.source,
                status=lead.status,
                createdAt=lead.created_at.strftime("%d %b %Y") if lead.created_at else "Recently",
            )
            for lead in top_leads
        ]

        # Recent Activity (Compiled from recent Leads, Surveys, and Projects)
        recent_activity: List[RecentActivityItem] = []
        act_id = 1

        for lead in top_leads[:2]:
            recent_activity.append(
                RecentActivityItem(
                    id=act_id,
                    title=f"New lead from {lead.source.lower() if lead.source else 'website'}",
                    subtitle=lead.name,
                    time=format_relative_time(lead.created_at),
                    icon="user",
                    tint="bg-blue-accent",
                )
            )
            act_id += 1

        top_surveys = (
            db.query(SiteSurvey)
            .order_by(desc(SiteSurvey.created_at))
            .limit(2)
            .all()
        )
        for s in top_surveys:
            recent_activity.append(
                RecentActivityItem(
                    id=act_id,
                    title=f"Site survey {s.status.lower()}",
                    subtitle=s.customer_name,
                    time=format_relative_time(s.created_at),
                    icon="calendar",
                    tint="bg-leaf-600",
                )
            )
            act_id += 1

        top_projects = (
            db.query(Project)
            .filter(Project.status == "Completed")
            .order_by(desc(Project.updated_at))
            .limit(1)
            .all()
        )
        for p in top_projects:
            recent_activity.append(
                RecentActivityItem(
                    id=act_id,
                    title="Project marked as completed",
                    subtitle=p.name,
                    time=format_relative_time(p.updated_at),
                    icon="check",
                    tint="bg-leaf-600",
                )
            )
            act_id += 1

        return DashboardSummaryResponse(
            statCards=stat_cards,
            leadsOverview=leads_overview,
            leadsBySource=leads_by_source,
            recentLeads=recent_leads,
            recentActivity=recent_activity,
        )
