from pydantic import BaseModel
from typing import Optional

class Element(BaseModel):
    label: str
    lang: Optional[str]
    uri: str
    type: list[str]