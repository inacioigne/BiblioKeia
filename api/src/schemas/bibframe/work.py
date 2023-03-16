from pydantic import BaseModel
from typing import Optional

class Subject(BaseModel):
    label: str
    uri: str

class Work_Schema(BaseModel):
    ID: Optional[str]
    content: str
    mainTitle: str
    subtitle: Optional[str]
    variantTitle: Optional[str]
    primaryContributionAgent: str
    primaryContributionUri: str
    primaryContributionRole: str
    subjects: list[Subject]
    language: str
    languageCode: str 
    cdd: str
    cutter: str
    serie: Optional[str]
    serieURI: Optional[str]

    
test = {
  "content": "text",
  "mainTitle": "Conjecturas e refutações",
  "subtitle": "refutações",
  "primaryContributionAgent": "Inácio Oliveira",
  "primaryContributionUri": "n80032184",
  "primaryContributionRole": "Autor",
  "subjects": [
    {
    "label": "Methodology",
     "uri": "http://id.loc.gov/authorities/subjects"
    }
  ],
  "language": "Portugues",
  "languageCode": "por",
  "cdd": "584.6",
  "cutter": "A586w"
}