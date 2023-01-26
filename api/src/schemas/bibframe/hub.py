from pydantic import BaseModel
from typing import Optional

class Hub_Schema(BaseModel):
    type: str
    mainTitle: str
    subtitle: Optional[str] = None
    variantTitle: Optional[str] = None
    contributionAgent: str
    contributionID: str
    contributionRole: str
    contributionRoleUri: str
    cdd: str
    cutter: Optional[str] = None
    issn: Optional[str] = None
