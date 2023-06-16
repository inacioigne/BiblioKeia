from pydantic import BaseModel
from typing import Optional

class ProvisionActivity(BaseModel):
    agent: Optional[str]
    date: str
    place: str