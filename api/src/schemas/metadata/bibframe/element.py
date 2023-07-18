from pydantic import BaseModel
from typing import Optional

class Element(BaseModel):
    label: str
    lang: Optional[str] = None
    uri: str
    type: list[str]