from typing import Optional
from pydantic import BaseModel


class FilteredReplays(BaseModel):
    count: Optional[int]
    list: list
    next: Optional[str]