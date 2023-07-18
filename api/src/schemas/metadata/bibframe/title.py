from pydantic import BaseModel, Field
from typing import Optional

class Title(BaseModel):
    type: str = Field(default="bf:Title")
    mainTitle: str
    subtitle: Optional[str] = None
    label: Optional[str] = None