from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class CalculatorSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    phone: str = Field(..., min_length=5, max_length=50)
    email: Optional[str] = None
    property_type: str = Field(default="Residential")  # Residential, Commercial, Industrial
    monthly_bill: float = Field(..., gt=0)
    roof_area: float = Field(..., gt=0)
    system_size_kw: float = Field(..., gt=0)
    annual_savings: float = Field(..., gt=0)
    payback_years: Optional[float] = None
    co2_tons: Optional[float] = None


class SavingsEstimateRequest(BaseModel):
    monthly_bill: float = Field(..., gt=0)
    roof_area: float = Field(..., gt=0)


class SavingsEstimateResponse(BaseModel):
    system_size_kw: float
    annual_savings: float
    payback_years: float
    co2_tons: float


class RoofCapacityRequest(BaseModel):
    roof_area: float = Field(..., gt=0)
    shading: str = Field(default="None")
    orientation: str = Field(default="South-facing")


class RoofCapacityResponse(BaseModel):
    panel_count: int
    system_size_kw: float
    annual_generation: int


class ROIEstimateRequest(BaseModel):
    system_size_kw: float = Field(..., gt=0)
    monthly_savings: float = Field(..., gt=0)
    subsidy: float = Field(default=0, ge=0)


class ROIEstimateResponse(BaseModel):
    net_investment: float
    payback_years: float
    lifetime_savings: float
    roi_percent: float


class CalculatorSubmissionResponse(BaseModel):
    id: int
    name: str
    phone: str
    email: Optional[str] = None
    property_type: str
    monthly_bill: float
    roof_area: float
    system_size_kw: float
    annual_savings: float
    payback_years: Optional[float] = None
    co2_tons: Optional[float] = None
    date: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CalculatorSettingsUpdate(BaseModel):
    electricity_rate: Optional[float] = Field(None, gt=0)
    generation_per_kw: Optional[float] = Field(None, gt=0)
    installation_cost_per_kw: Optional[float] = Field(None, gt=0)
    bill_offset_percent: Optional[float] = Field(None, gt=0, le=100)


class CalculatorSettingsResponse(BaseModel):
    id: int
    electricity_rate: float = 8.0
    generation_per_kw: float = 120.0
    installation_cost_per_kw: float = 55000.0
    bill_offset_percent: float = 85.0
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
