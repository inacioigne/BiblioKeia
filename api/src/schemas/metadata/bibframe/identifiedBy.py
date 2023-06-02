from pydantic import BaseModel, Field

class IdentifiedBy(BaseModel):
    type: str = Field(default='Local')
    assigner: str = Field(default="http://id.loc.gov/vocabulary/organizations/brmninpa")
    value: str  