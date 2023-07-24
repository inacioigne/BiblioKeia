from pydantic import BaseModel, Field, field_validator
# from typing import Optional
from datetime import date
# from .identifiedBy import IdentifiedBy
from .status import Status
from datetime import datetime, date

class AdminMetadata(BaseModel):
    encodingLevel: str = Field(default="menclvl:f")
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    creationDate: date = Field(default=date.today())
    descriptionConventions: str = Field(default="http://id.loc.gov/vocabulary/descriptionConventions/isbd")
    descriptionModifier: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    descriptionLanguage: str = Field(default="http://id.loc.gov/vocabulary/languages/por")
    generationProcess: str = Field(default="BiblioKeia v.1")
    generationDate: datetime = Field(default=datetime.now())
    # identifiedBy: list[IdentifiedBy] 
    status: Status = Field(default=Status(value="mstatus:new", label="novo"))

    # @field_validator('generationDate')
    # def val_x(cls, v: datetime) -> datetime:
    #     return datetime.now()