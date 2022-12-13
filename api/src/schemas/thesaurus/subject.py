from pydantic import BaseModel
from typing import Optional

class Authority(BaseModel):
    value: str
    lang: str

class AuthorityExternal(BaseModel):
    value: str
    lang: str
    uri: str


class Subject_Schema(BaseModel):
    authority: Authority
    tokenLSCH: str
    variant: list[Authority]
    broader: list[AuthorityExternal]
    narrower: list[AuthorityExternal]
    reciprocalAuthority: Optional[list[AuthorityExternal]]
    exactExternalAuthority: Optional[list]
    closeExternalAuthority: Optional[list]

class Authority_Update(BaseModel):
    token: str
    metadata: str

class Update_Thesarus(BaseModel):
    graph: str
    data: list[Authority_Update]

{
    "authority": {
        "value": "Ciência da Informação",
        "lang": "pt"
    },
    "narrower": [
        {
            "value": "geomática",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh99004272"
        },
        {
            "value": "informática agrícola",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh97004947"
        },
        {
            "value": "Documentação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85038731"
        },
        {
            "value": "Serviços de informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85066157"
        },
        {
            "value": "Recuperação de informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85066148"
        },
        {
            "value": "Bibliotecas--Coleções especiais--Ciência da informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2021005976"
        },
        {
            "value": "informática médica",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh89005069"
        },
        {
            "value": "A comunicação na ciência da informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85029072"
        },
        {
            "value": "Bioinformática",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh00003585"
        },
        {
            "value": "Visualização de informações",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2002000243"
        },
        {
            "value": "quimioinformática",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2003001403"
        },
        {
            "value": "organização da informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh99001059"
        },
        {
            "value": "Mulheres na ciência da informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85147580"
        },
        {
            "value": "Recursos de informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh96008049"
        },
        {
            "value": "Classificação--Livros--Ciência da informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2021005267"
        }
    ],
    "broader": [
        {
            "value": "Comunicação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85029027"
        }
    ],
    "variant": [],
    "reciprocalAuthority": [
        {
            "value": "Literacia da informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh00007046"
        },
        {
            "value": "Biblioteconomia",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85076723"
        }
    ],
    "exactExternalAuthority": [
        "http://id.loc.gov/authorities/subjects/sh85066150",
        "http://lod.nal.usda.gov/nalt/17411"
    ],
    "closeExternalAuthority": [
        "http://www.yso.fi/onto/yso/p17836",
        "http://data.bnf.fr/ark:/12148/cb11965196f",
        "http://www.wikidata.org/entity/Q16387",
        "http://id.worldcat.org/fast/972640"
    ],
    "tokenLSCH": "sh85066150"
}