from pydantic import BaseModel

class Content(BaseModel):
    label: str
    value: str