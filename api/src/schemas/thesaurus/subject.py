from pydantic import BaseModel
from typing import Optional

class Subject_Schema(BaseModel):
    authority: str
    tokenLSCH: str
    variant: str
    reciprocalAuthority: Optional[dict]
    narrowerAuthority: Optional[list]
