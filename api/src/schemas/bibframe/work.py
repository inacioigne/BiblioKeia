from rdflib import Graph
from pydantic import BaseModel, validator, Field
from typing import Optional, Union
from pyfuseki import FusekiUpdate
import json
from datetime import date, datetime

with open('values.json') as file:
    reader = file.read()
    vocabulary = json.loads(reader)
    file.close()

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

    _status = vocabulary['mstatus']

    @validator('value')
    def status_accepted(cls, v):
        if v not in cls._status:
            raise ValueError(f"the status code must be one of the following : {', '.join(cls._status)}")
        return v



class AdminMetadata(BaseModel):
    encodingLevel: str = Field(default="menclvl:f")
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    creationDate: Optional[str]
    descriptionConventions: str = Field(default="http://id.loc.gov/vocabulary/descriptionConventions/isbd")
    descriptionLanguage: str = Field(default="http://id.loc.gov/vocabulary/languages/por")
    generationProcess: Optional[GenerationProcess]
    status: Status = Field(default=Status(value="mstatus:new", label="novo"))

    
    _level = vocabulary['menclvl']
    
    @validator('encodingLevel')
    def level_accepted(cls, v):
        if v not in cls._level:
            raise ValueError(f"the level code must be one of the following : {', '.join(cls._level)}")
        return v

    @validator('creationDate', pre=True, always=True)
    def set_date_today(cls, v):
        today = date.today().strftime("%Y-%m-%d")
        
        return today
    
class Classification(BaseModel):
    classificationPortion: str
    itemPortion: str
    edition: int

class Content(BaseModel):
    label: str
    value: str

class Contribution(BaseModel):
    type: list[str]
    agent: str
    label: str
    role: str

    _type = ["bf:Contribution", "bflc:PrimaryContribution" ]
    _role = vocabulary['relators']

    @validator('type')
    def type_accepted(cls, v):
        for i in v:
            if i not in cls._type:
                raise ValueError(f"the type code must be one of the following : {', '.join(cls._type)}")
        return v
    
    @validator('role')
    def role_accepted(cls, v):
        if v not in cls._role:
            raise ValueError(f"the role is not permited")
        return v
    
class GenreForm(BaseModel):
    label: str
    value: str

class Language(BaseModel):
    type: str = Field(default="bf:Language")
    part: Optional[str] 
    value: str
    label: str

class Title(BaseModel):
    type: str = Field(default="bf:Title")
    mainTitle: str
    subtitle: Optional[str]

class Topic(BaseModel):
    label: str
    value: str

class Illustration(BaseModel):
    label: str
    value: str

class SupplementaryContent(BaseModel):
    label: str
    value: str

class Work(BaseModel):
    type: list[str]
    adminMetadata: AdminMetadata
    classification: Classification
    content: list[Content]
    contribution: list[Contribution]
    genreForm: Optional[list[GenreForm]]
    language: list[Language]
    note: Optional[str]
    summary: Optional[str]
    title: Title
    subject: list[Topic]
    illustrativeContent: Optional[list[Illustration]]
    supplementaryContent: Optional[list[SupplementaryContent]]
    expressionOf: Optional[str]
    hasInstance: Optional[str]