from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class BlogBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    category: str = Field(default="Guides")  # Guides, Savings, Policy, Maintenance, Technology, Case Study
    status: str = Field(default="Draft")  # Published, Draft
    author: Optional[str] = "Admin"
    date: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    read_time: Optional[str] = "5 min read"


class BlogCreate(BlogBase):
    slug: Optional[str] = None


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    status: Optional[str] = None
    author: Optional[str] = None
    date: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    read_time: Optional[str] = None


class BlogResponse(BlogBase):
    id: int
    slug: str
    author_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
