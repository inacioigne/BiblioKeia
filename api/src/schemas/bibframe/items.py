from pydantic import BaseModel
from typing import Optional, List

class Item(BaseModel):
    shelfMark: str
    sublocation: str
    barcode: str
    itemOf: str

class Items_Schema(BaseModel):
    items: List[Item]


{
  "items": [
    {
      "shelfMark": "545.5 B352a",
      "sublocation": "E1.P2",
      "barcode": "22-4553",
      "itemOf": "http://bibliokeia.com/bibframe/instance/2"
    },
    {
      "shelfMark": "545.5 B352a",
      "sublocation": "E1.P2",
      "barcode": "22-4553",
      "itemOf": "http://bibliokeia.com/bibframe/instance/2"
    }
  ]
}