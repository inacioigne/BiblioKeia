from pydantic import BaseModel
from typing import Optional, List

class Item(BaseModel):
    shelfMark: str
    sublocation: str
    barcode: str

class Items_Schema(BaseModel):
  itemOf: str
  items: List[Item]


{
  "itemOf": "bk-123",
  "items": [
    {
      "shelfMark": "545.5 B352a",
      "sublocation": "E1.P2",
      "barcode": "22-4553"
    },
{
      "shelfMark": "653.5 C563k",
      "sublocation": "E1.P2",
      "barcode": "22-6532"
    }
  ]
}