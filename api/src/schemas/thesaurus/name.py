from pydantic import BaseModel
from typing import Optional

class Name_Schema(BaseModel):
    token: str
    nt: str
   