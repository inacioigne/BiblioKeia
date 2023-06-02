from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import date
from .generationProcess import GenerationProcess
from .identifiedBy import IdentifiedBy
from .status import Status

class AdminMetadata(BaseModel):
    encodingLevel: str = Field(default="menclvl:f")
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    creationDate: Optional[str]
    descriptionConventions: str = Field(default="http://id.loc.gov/vocabulary/descriptionConventions/isbd")
    descriptionModifier: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    descriptionLanguage: str = Field(default="http://id.loc.gov/vocabulary/languages/por")
    generationProcess: Optional[GenerationProcess]
    identifiedBy: list[IdentifiedBy]
    status: Status = Field(default=Status(value="mstatus:new", label="novo"))
    
    # _level = vocabulary['menclvl']
    
    # @validator('encodingLevel')
    # def level_accepted(cls, v):
    #     if v not in cls._level:
    #         raise ValueError(f"the level code must be one of the following : {', '.join(cls._level)}")
    #     return v

    @validator('creationDate', pre=True, always=True)
    def set_date_today(cls, v):
        today = date.today().strftime("%Y-%m-%d")
        
        return today