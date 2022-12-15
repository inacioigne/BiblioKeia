from pydantic import BaseModel
from typing import Optional

class Authority(BaseModel):
    value: str
    lang: str
    type: Optional[str]

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
    "note": {
        "value": "Aqui são inseridos trabalhos gerais de pesquisa, e com subdivisão local, trabalhos de pesquisa realizados em locais específicos. Trabalhos de pesquisa sobre uma determinada região, país, etc. são inseridos sob o nome da região, país, etc. com a subdivisão [Pesquisa.]",
        "lang": "pt"
    },
    "authority": {
        "value": "Pesquisar",
        "lang": "pt"
    },
    "narrower": [
        {
            "value": "Pesquisa de marketing",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85081350"
        },
        {
            "value": "Trabalho em grupo de pesquisa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh88005724"
        },
        {
            "value": "pesquisa militar",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85085281"
        },
        {
            "value": "Teoria da informação em pesquisa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85066301"
        },
        {
            "value": "pesquisa na internet",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2002010603"
        },
        {
            "value": "pesquisa rodoviária",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85060783"
        },
        {
            "value": "Pesquisa de baixa temperatura",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85078652"
        },
        {
            "value": "Pré-impressões",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85106389"
        },
        {
            "value": "Observação do participante",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85098354"
        },
        {
            "value": "Universidades e faculdades - Trabalho de pós-graduação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85141124"
        },
        {
            "value": "Pesquisa, Indústria",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85113031"
        },
        {
            "value": "Pesquisa de métodos mistos",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2010001158"
        },
        {
            "value": "Pesquisa de motivação (Marketing)",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85087568"
        },
        {
            "value": "Pesquisas científicas",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85118694"
        },
        {
            "value": "Pesquisa experiencial",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85046439"
        },
        {
            "value": "Modelos animais em pesquisa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85005212"
        },
        {
            "value": "Avaliação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85045926"
        },
        {
            "value": "experimentação animal",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85005173"
        },
        {
            "value": "Pesquisa quantitativa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2007000909"
        },
        {
            "value": "Pesquisa reprodutível",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2013002574"
        },
        {
            "value": "Pesquisa qualitativa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh99004969"
        },
        {
            "value": "pesquisa operacional",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85095020"
        },
        {
            "value": "pesquisa de terreno",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85074304"
        },
        {
            "value": "Design experimental",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85046441"
        },
        {
            "value": "Ensaios clínicos randomizados em grupo",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh97004129"
        },
        {
            "value": "Pesquisa legal",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85075767"
        },
        {
            "value": "método longitudinal",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85078296"
        },
        {
            "value": "Projetos de Pesquisa e Desenvolvimento",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2007003908"
        },
        {
            "value": "Observatórios",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85093748"
        },
        {
            "value": "Descobertas na ciência",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh93003312"
        },
        {
            "value": "Bibliotecas--Coleções especiais--Pesquisa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2021006131"
        },
        {
            "value": "Pesquisa interdisciplinar",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh88006165"
        },
        {
            "value": "pesquisa naval",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85090404"
        },
        {
            "value": "Pesquisa vulcanológica",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85144279"
        },
        {
            "value": "Serviço de inteligência",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85067175"
        },
        {
            "value": "Radioisótopos em pesquisa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85110756"
        },
        {
            "value": "Investigação narrativa (método de pesquisa)",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh2006004688"
        },
        {
            "value": "Estudo sobre as areas",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85006988"
        },
        {
            "value": "Redação de proposta em pesquisa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85107550"
        }
    ],
    "broader": [],
    "variant": [
        {
            "value": "Scientific research",
            "lang": "pt",
            "type": "Topic"
        },
        {
            "value": "pesquisa científica",
            "lang": "pt",
            "type": "Topic"
        },
        {
            "value": "Ciência--Pesquisa",
            "lang": "pt",
            "type": "ComplexSubject"
        }
    ],
    "reciprocalAuthority": [
        {
            "value": "Serviços de informação",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85066157"
        },
        {
            "value": "Equipes de pesquisa",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85113055"
        },
        {
            "value": "Metodologia",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85084414"
        },
        {
            "value": "Aprendizado e bolsa de estudos",
            "lang": "pt",
            "uri": "http://id.loc.gov/authorities/subjects/sh85075529"
        }
    ],
    "exactExternalAuthority": [
        "http://id.loc.gov/authorities/subjects/sh85113021",
        "http://lod.nal.usda.gov/nalt/5458"
    ],
    "closeExternalAuthority": [
        "http://data.bnf.fr/ark:/12148/cb11938467s",
        "http://www.yso.fi/onto/yso/p183",
        "http://www.wikidata.org/entity/Q42240",
        "http://id.worldcat.org/fast/1095153",
        "http://d-nb.info/gnd/4017894-8",
        "http://d-nb.info/gnd/4131708-7"
    ],
    "tokenLSCH": "sh85113021"
}