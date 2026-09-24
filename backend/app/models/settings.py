from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from app.core.database import Base


class SystemSettings(Base):
    __tablename__ = "system_settings"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(200), default="SOLARA Energy Solutions", nullable=False)
    support_email = Column(String(255), default="support@solara.com", nullable=False)
    email_notifications = Column(Boolean, default=True, nullable=False)
    sms_notifications = Column(Boolean, default=False, nullable=False)
    lead_alerts = Column(Boolean, default=True, nullable=False)
    two_factor_auth = Column(Boolean, default=False, nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
