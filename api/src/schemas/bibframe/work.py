from pydantic import BaseModel
from typing import Optional

class Subject(BaseModel):
    label: str
    uri: str

class Contribution(BaseModel):
    label: str
    role: str
    uri: str

class Classification(BaseModel):
    type: str
    classificationPortion: str
    itemPortion: str

class Work_Schema(BaseModel):
    ID: Optional[str]
    content: str
    mainTitle: str
    subtitle: Optional[str]
    variantTitle: Optional[str]
    primaryContributionAgent: str
    primaryContributionUri: str
    primaryContributionRole: str
    primaryContributionRoleUri: str
    subjects: list[Subject]
    language: str
    languageCode: str 
    cdd: str
    cutter: str
    serie: Optional[str]
    serieURI: Optional[str]

class Work_Edit(BaseModel):
    ID: Optional[str]
    content: Optional[str]
    mainTitle: Optional[str]
    subtitle: Optional[str]
    variantTitle: Optional[str]
    primaryContributionAgent: Optional[str]
    primaryContributionUri: Optional[str]
    primaryContributionRole: Optional[str]
    primaryContributionRoleUri: Optional[str]
    subjects: Optional[list[Subject]]
    language: Optional[str]
    languageCode: Optional[str] 
    cdd: Optional[str]
    cutter: Optional[str]
    serie: Optional[str]
    serieURI: Optional[str]

class Work_Response(BaseModel):
    type: list
    classification: Classification
    contribution: Contribution

    
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