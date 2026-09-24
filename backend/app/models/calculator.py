from sqlalchemy import Column, Integer, String, Float, DateTime, func
from app.core.database import Base


class CalculatorSubmission(Base):
    __tablename__ = "calculator_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    property_type = Column(String(50), default="Residential", nullable=False)
    monthly_bill = Column(Float, nullable=False)
    roof_area = Column(Float, nullable=False)
    system_size_kw = Column(Float, nullable=False)
    annual_savings = Column(Float, nullable=False)
    payback_years = Column(Float, nullable=True)
    co2_tons = Column(Float, nullable=True)
    date = Column(String(50), nullable=True)  # e.g. "2026-09-15"
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)


class CalculatorSettings(Base):
    __tablename__ = "calculator_settings"

    id = Column(Integer, primary_key=True, index=True)
    electricity_rate = Column(Float, default=8.0, nullable=False)  # ₹ / unit
    generation_per_kw = Column(Float, default=120.0, nullable=False)  # units/month per kW
    installation_cost_per_kw = Column(Float, default=55000.0, nullable=False)  # ₹ per kW
    bill_offset_percent = Column(Float, default=85.0, nullable=False)  # %
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
