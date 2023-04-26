from pydantic import BaseModel, validator, Field
from typing import Optional, Union
from datetime import datetime, date

class Uri(BaseModel):
    value: str
    label: str

class Label(BaseModel):
    value: str
    lang: Optional[str]

class Element(BaseModel):
    type: str
    elementValue: Label

class Variant(BaseModel):
    type: str
    elementList: list[Element]

class Affiliation(BaseModel):
    organization: Uri
    affiliationStart: Optional[str]
    affiliationEnd: Optional[str]

class GenerationProcess(BaseModel):
    label: str = Field(default="BiblioKeia v.1")
    generationDate: Optional[str]

    @validator('generationDate', pre=True, always=True)
    def set_date_now(cls, v):
        now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        
        return now
class Status(BaseModel):
    value: str = Field(default="mstatus:new")
    label: str = Field(default="novo")

class AdminMetadata(BaseModel):
    encodingLevel: str = Field(default="menclvl:f")
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    creationDate: date = Field(default=date.today())
    descriptionConventions: str = Field(default="http://id.loc.gov/vocabulary/descriptionConventions/isbd")
    descriptionLanguage: str = Field(default="http://id.loc.gov/vocabulary/languages/por")
    generationProcess: Optional[GenerationProcess]
    status: Status = Field(default=Status(value="mstatus:new", label="novo"))

class Authority(BaseModel):
    type: str
    adminMetadata: AdminMetadata
    recordChangeDate: datetime = Field(default=datetime.now())
    elementList: list[Element]
    fullerName: Optional[Element]
    birthDate: Optional[str]
    birthPlace: Optional[Label]
    deathDate: Optional[str]
    occupation: Optional[list[Uri]]
    hasAffiliation: Optional[list[Affiliation]]
    hasBroaderAuthority: Optional[list[Uri]]
    subjectOf: Optional[list[Uri]]
    contributionOf: Optional[list[Uri]]
    hasCloseExternalAuthority: Optional[list[Uri]]
    hasExactExternalAuthority: Optional[list[Uri]]
    hasNarrowerAuthority: Optional[list[Uri]]
    hasVariant: Optional[list[Variant]]
    isMemberOfMADSCollection: str