from pydantic import BaseModel
from typing import Optional

class Instance_Schema(BaseModel):
    instanceOf: str
    mainTitle: str
    subtitle: Optional[str]
    extent: str
    publication: str
    place: str
    date: str
    responsibility: str
    series: Optional[str]





{
  "instanceOf": "bk-22-3",
  "mainTitle": "Conjectures and refutations",
  "subtitle": "the growth of scientific",
  "extent": "417 p.",
  "publication": "Editora do INPA",
  "place": "Manaus",
  "date": "2022",
  "responsibility": "Inácio Oliveira",
  "series": "Serie amazonia"
}
