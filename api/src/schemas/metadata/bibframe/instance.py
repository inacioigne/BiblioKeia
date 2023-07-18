from pydantic import BaseModel
from typing import Optional
from src.schemas.metadata.bibframe.provisionActivity import ProvisionActivity
from src.schemas.metadata.bibframe.adminMetadata import AdminMetadata
from src.schemas.metadata.bibframe.element import Element
from src.schemas.metadata.bibframe.title import Title

class Value(BaseModel):
    label: str
    type: str

class Instance(BaseModel):
    adminMetadata: AdminMetadata
    type: list[str]
    title: Title
    carrier: list[Element]
    copyrightDate: Optional[str] = None
    dimensions: Optional[str] = None
    extent: Optional[Value] = None
    instanceOf: Element
    issuance: Optional[list[Element]] = None
    media: Optional[list[Element]] = None
    provisionActivity: ProvisionActivity
    provisionActivityStatement: Optional[str] = None
    responsibilityStatement: Optional[str] = None
    seriesStatement: Optional[str] = None