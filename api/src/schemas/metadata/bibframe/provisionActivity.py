from pydantic import BaseModel
from typing import Optional

class ProvisionActivity(BaseModel):
    agent: Optional[str] = None
    date: str
    place: str