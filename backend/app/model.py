from typing import Optional
from pydantic import BaseModel

class Ping(BaseModel):
    message: str
    error: Optional[str]