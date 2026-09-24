from typing import Generic, TypeVar, Optional, List, Any
from pydantic import BaseModel, Field

DataT = TypeVar("DataT")


class APIResponse(BaseModel, Generic[DataT]):
    success: bool = True
    message: str = "Operation completed successfully"
    data: Optional[DataT] = None


class APIErrorResponse(BaseModel):
    success: bool = False
    message: str
    error_code: str = "BAD_REQUEST"
    details: Optional[Any] = None


class PaginationMeta(BaseModel):
    page: int = 1
    limit: int = 10
    total: int = 0
    total_pages: int = 1


class PaginatedResponse(BaseModel, Generic[DataT]):
    success: bool = True
    items: List[DataT] = Field(default_factory=list)
    meta: PaginationMeta
