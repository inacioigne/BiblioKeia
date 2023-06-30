from pydantic import BaseModel,validator

relators =  [
    "relators:abr",
    "relators:acp",
    "relators:act",
    "relators:adi",
    "relators:adp",
    "relators:aft",
    "relators:anl",
    "relators:anm",
    "relators:ann",
    "relators:ant",
    "relators:ape",
    "relators:apl",
    "relators:app",
    "relators:aqt",
    "relators:arc",
    "relators:ard",
    "relators:arr",
    "relators:art",
    "relators:asg",
    "relators:asn",
    "relators:ato",
    "relators:att",
    "relators:auc",
    "relators:aud",
    "relators:aui",
    "relators:aus",
    "relators:aut",
    "relators:bdd",
    "relators:bjd",
    "relators:bkd",
    "relators:bkp",
    "relators:blw",
    "relators:bnd",
    "relators:bpd",
    "relators:brd",
    "relators:brl",
    "relators:bsl",
    "relators:cas",
    "relators:ccp",
    "relators:chr",
    "relators:cli",
    "relators:cll",
    "relators:clr",
    "relators:clt",
    "relators:cmm",
    "relators:cmp",
    "relators:cmt",
    "relators:cnd",
    "relators:cng",
    "relators:cns",
    "relators:coe",
    "relators:col",
    "relators:com",
    "relators:con",
    "relators:cor",
    "relators:cos",
    "relators:cot",
    "relators:cou",
    "relators:cov",
    "relators:cpc",
    "relators:cpe",
    "relators:cph",
    "relators:cpl",
    "relators:cpt",
    "relators:cre",
    "relators:crp",
    "relators:crr",
    "relators:crt",
    "relators:csl",
    "relators:csp",
    "relators:cst",
    "relators:ctb",
    "relators:cte",
    "relators:ctg",
    "relators:ctr",
    "relators:cts",
    "relators:ctt",
    "relators:cur",
    "relators:cwt",
    "relators:dbp",
    "relators:dfd",
    "relators:dfe",
    "relators:dft",
    "relators:dgc",
    "relators:dgg",
    "relators:dgs",
    "relators:dis",
    "relators:dln",
    "relators:dnc",
    "relators:dnr",
    "relators:dpc",
    "relators:dpt",
    "relators:drm",
    "relators:drt",
    "relators:dsr",
    "relators:dst",
    "relators:dtc",
    "relators:dte",
    "relators:dtm",
    "relators:dto",
    "relators:dub",
    "relators:edc",
    "relators:edm",
    "relators:edt",
    "relators:egr",
    "relators:elg",
    "relators:elt",
    "relators:eng",
    "relators:enj",
    "relators:etr",
    "relators:evp",
    "relators:exp",
    "relators:fac",
    "relators:fds",
    "relators:fld",
    "relators:flm",
    "relators:fmd",
    "relators:fmk",
    "relators:fmo",
    "relators:fmp",
    "relators:fnd",
    "relators:fpy",
    "relators:frg",
    "relators:gis",
    "relators:his",
    "relators:hnr",
    "relators:hst",
    "relators:ill",
    "relators:ilu",
    "relators:ins",
    "relators:inv",
    "relators:isb",
    "relators:itr",
    "relators:ive",
    "relators:ivr",
    "relators:jud",
    "relators:jug",
    "relators:lbr",
    "relators:lbt",
    "relators:ldr",
    "relators:led",
    "relators:lee",
    "relators:lel",
    "relators:len",
    "relators:let",
    "relators:lgd",
    "relators:lie",
    "relators:lil",
    "relators:lit",
    "relators:lsa",
    "relators:lse",
    "relators:lso",
    "relators:ltg",
    "relators:lyr",
    "relators:mcp",
    "relators:mdc",
    "relators:med",
    "relators:mfp",
    "relators:mfr",
    "relators:mod",
    "relators:mon",
    "relators:mrb",
    "relators:mrk",
    "relators:msd",
    "relators:mte",
    "relators:mtk",
    "relators:mus",
    "relators:nrt",
    "relators:opn",
    "relators:org",
    "relators:orm",
    "relators:osp",
    "relators:oth",
    "relators:own",
    "relators:pad",
    "relators:pan",
    "relators:pat",
    "relators:pbd",
    "relators:pbl",
    "relators:pdr",
    "relators:pfr",
    "relators:pht",
    "relators:plt",
    "relators:pma",
    "relators:pmn",
    "relators:pop",
    "relators:ppm",
    "relators:ppt",
    "relators:pra",
    "relators:prc",
    "relators:prd",
    "relators:pre",
    "relators:prf",
    "relators:prg",
    "relators:prm",
    "relators:prn",
    "relators:pro",
    "relators:prp",
    "relators:prs",
    "relators:prt",
    "relators:prv",
    "relators:pta",
    "relators:pte",
    "relators:ptf",
    "relators:pth",
    "relators:ptt",
    "relators:pup",
    "relators:rbr",
    "relators:rcd",
    "relators:rce",
    "relators:rcp",
    "relators:rdd",
    "relators:red",
    "relators:ren",
    "relators:res",
    "relators:rev",
    "relators:rpc",
    "relators:rps",
    "relators:rpt",
    "relators:rpy",
    "relators:rse",
    "relators:rsg",
    "relators:rsp",
    "relators:rsr",
    "relators:rst",
    "relators:rth",
    "relators:rtm",
    "relators:sad",
    "relators:sce",
    "relators:scl",
    "relators:scr",
    "relators:sds",
    "relators:sec",
    "relators:sgd",
    "relators:sgn",
    "relators:sht",
    "relators:sll",
    "relators:sng",
    "relators:spk",
    "relators:spn",
    "relators:spy",
    "relators:srv",
    "relators:std",
    "relators:stg",
    "relators:stl",
    "relators:stm",
    "relators:stn",
    "relators:str",
    "relators:tcd",
    "relators:tch",
    "relators:ths",
    "relators:tld",
    "relators:tlp",
    "relators:trc",
    "relators:trl",
    "relators:tyd",
    "relators:tyg",
    "relators:uvp",
    "relators:vac",
    "relators:vdg",
    "relators:wac",
    "relators:wal",
    "relators:wam",
    "relators:wat",
    "relators:wdc",
    "relators:wde",
    "relators:win",
    "relators:wit",
    "relators:wpr",
    "relators:wst"
  ]


class Contribution(BaseModel): 
    type: list[str]
    agent: str
    label: str
    role: str

    _type = ["bf:Contribution", 'http://id.loc.gov/ontologies/bflc/PrimaryContribution' ]
    # _role = relators

    @validator('type')
    def type_accepted(cls, v):
        for i in v:
            if i not in cls._type:
                raise ValueError(f"the type code must be one of the following : {', '.join(cls._type)}")
        return v
    
    # @validator('role')
    # def role_accepted(cls, v):
    #     if v not in cls._role:
    #         raise ValueError(f"the role is not permited")
    #     return v