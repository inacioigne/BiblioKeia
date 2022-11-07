from pydantic import BaseModel
from typing import Optional

class Work_Schema(BaseModel):
    contentType: str
    mainTitle: str
    subtitle: Optional[str]
    contributionAgent: str
    contributionID: str
    contributionRole: str
    contributionRoleUri: str
    subjects: list
    
test = {
  "contentType": "text",
  "mainTitle": "Conjecturas e refutações",
  "subtitle": "refutações",
  "contributionAgent": "Inácio Oliveira",
  "contributionID": "n80032184",
  "contributionRole": "Autor",
  "contributionRoleUri": "http://id.loc.gov/vocabulary/relators/ctb",
  "subjects": [
    {
    "label": "Methodology"
    },
    {
    "label": "Philosofy"
    }
  ]
}