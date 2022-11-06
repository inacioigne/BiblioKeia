from pydantic import BaseModel
from typing import Optional

class Work_Schema(BaseModel):
    contentType: str
    mainTitle: str
    subtitle: Optional[str]
    contributionAgent: str
    contributionRole: str
    contributionRoleUri: str
    contributionID: str
    