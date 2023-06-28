from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import date
# from .generationProcess import GenerationProcess
from .identifiedBy import IdentifiedBy
from .status import Status
from datetime import datetime, date

class AdminMetadata(BaseModel):
    encodingLevel: str = Field(default="menclvl:f")
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    # creationDate: Optional[str]
    creationDate: date = Field(default=date.today())
    descriptionConventions: str = Field(default="http://id.loc.gov/vocabulary/descriptionConventions/isbd")
    descriptionModifier: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    descriptionLanguage: str = Field(default="http://id.loc.gov/vocabulary/languages/por")
    # generationProcess: Optional[GenerationProcess]
    generationProcess: str = Field(default="BiblioKeia v.1")
    generationDate: datetime = Field(default=datetime.now())
    identifiedBy: list[IdentifiedBy]
    status: Status = Field(default=Status(value="mstatus:new", label="novo"))

    # @validator('creationDate', pre=True, always=True)
    # def set_date_today(cls, v):
    #     today = date.today().strftime("%Y-%m-%d")
        
    #     return today