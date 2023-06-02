from pydantic import BaseModel, Field

class Status(BaseModel):
    value: str = Field(default="mstatus:new")
    label: str = Field(default="novo")