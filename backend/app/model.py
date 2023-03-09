from typing import Optional
from pydantic import BaseModel

class Ping(BaseModel):
    status_code: int
    error: Optional[str]