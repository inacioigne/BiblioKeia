from pydantic import BaseModel
from typing import Optional

class Instance_Schema(BaseModel):
    instanceOf: str
    mainTitle: str
    subtitle: Optional[str]
    extent: str

{
  "instanceOf": "bk-22-3",
  "mainTitle": "Conjectures and refutations",
  "subtitle": "the growth of scientific",
  "extent": "417 p."
}