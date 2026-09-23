from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class BlogPost(Base):
    __tablename__ = "blogs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    category = Column(String(100), default="Guides", nullable=False)  # Guides, Savings, Policy, Maintenance, Technology, Case Study
    status = Column(String(50), default="Draft", nullable=False)  # Published, Draft
    author = Column(String(100), default="Admin", nullable=False)
    author_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    date = Column(String(50), nullable=True)  # e.g. "Sep 12, 2026"
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    cover_image = Column(String(500), nullable=True)
    read_time = Column(String(50), default="5 min read", nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    author_user = relationship("User", back_populates="blogs", foreign_keys=[author_id])
