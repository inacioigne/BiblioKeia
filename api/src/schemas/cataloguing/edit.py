from pydantic import BaseModel
from typing import Optional

class Data(BaseModel):
    action: str
    bf: str
    value: str

class BfEdit(BaseModel):
    data: list[Data]