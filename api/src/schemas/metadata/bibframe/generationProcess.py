from pydantic import BaseModel, Field, validator
from typing import Optional
from datetime import datetime

class GenerationProcess(BaseModel):
    label: str = Field(default="BiblioKeia v.1")
    generationDate: Optional[str]

    @validator('generationDate', pre=True, always=True)
    def set_date_now(cls, v):
        now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
        
        return now