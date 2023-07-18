from pydantic import BaseModel
from typing import Optional

class Classification(BaseModel):
    type: str
    classificationPortion: str
    itemPortion: Optional[str] = None
    edition: Optional[str] = None