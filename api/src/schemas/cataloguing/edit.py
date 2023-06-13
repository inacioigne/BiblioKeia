from pydantic import BaseModel
from typing import Optional
from typing import Union

class Data(BaseModel):
    action: str
    bf: str
    value: Union[dict, str]

class BfEdit(BaseModel):
    listData: list[Data]