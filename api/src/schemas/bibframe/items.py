from pydantic import BaseModel
from typing import Optional, List

class Item(BaseModel):
    library: str
    call: str
    shelf: str
    item: str

class Items_Schema(BaseModel):
  itemOf: str
  items: List[Item]




[
    {
        "library": "Biblioteca do INPA",
        "call": "542.6 F452a",
        "shelf": "E1.P1",
        "register": "bk-23-7"
    },
    {
        "library": "Biblioteca do INPA",
        "call": "542.6 F452a",
        "shelf": "E1.P1",
        "register": "bk-23-8"
    }
]