from pydantic import BaseModel, validator
from typing import Optional, Union

class Authority(BaseModel):
    value: Union[list, str]
    lang: Optional[str]
    date: Optional[str]
    type: str

    _types = ["Topic", "ComplexSubject", "PersonalName"]

    @validator('type')
    def type_permitido(cls, v):
        if v not in cls._types:
            raise ValueError(f"Type deve ser um dos seguintes valores: {', '.join(cls._types)}")
        return v