from pydantic import BaseModel
from typing import Optional

class Subject(BaseModel):
    label: str
    type: str
    uri: str

class Contribution(BaseModel):
    label: str
    role: str
    uri: str

class Classification(BaseModel):
    type: str
    classificationPortion: str
    itemPortion: str

class Title(BaseModel):
    mainTitle: str
    subtitle: Optional[str]
    variantTitle: Optional[str]

class Work_Schema(BaseModel):
    #ID: Optional[str]
    content: str
    title: Title
    primaryContribution: Optional[Contribution]
    subjects: list[Subject]
    language: str
    languageCode: str 
    cdd: str
    cutter: str
    serie: Optional[str]
    serieURI: Optional[str]

class Work_Edit(BaseModel):
    #ID: Optional[str]
    content: Optional[str]
    mainTitle: Optional[str]
    subtitle: Optional[str]
    variantTitle: Optional[str]
    primaryContribution: Optional[Contribution]
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
    primaryContribution: Contribution
    language: str
    subjects: list[Subject]

