from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict

from app.schemas.validators import AppEmailStr


class SystemSettingsUpdate(BaseModel):
    company_name: Optional[str] = Field(None, min_length=2, max_length=200)
    support_email: Optional[AppEmailStr] = None
    email_notifications: Optional[bool] = None
    sms_notifications: Optional[bool] = None
    lead_alerts: Optional[bool] = None
    two_factor_auth: Optional[bool] = None


class SystemSettingsResponse(BaseModel):
    id: int
    company_name: str
    support_email: str
    email_notifications: bool
    sms_notifications: bool
    lead_alerts: bool
    two_factor_auth: bool
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
