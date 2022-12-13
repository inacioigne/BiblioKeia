import {
  Box,
  Typography,
  Divider,
  Dialog,
  IconButton,
  Tooltip,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  DialogActions,
  Grid,
  TextField,
  ListItem,
  TextareaAutosize,
  List,
} from "@mui/material";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import MakeTranslate from "./makeTranslate";
import { useEffect, useState, useRef } from "react";
import ParserBK from "src/services/thesaurus/parser_bk";
import { api } from "src/services/api";
import CountGraph from "src/services/thesaurus/countGraph";
import SparqlClient from "sparql-http-client";
//import SimpleClient from "sparql-http-client/SimpleClient";
//import rdf from "rdf-ext";

async function GraphExist(data) {
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const ask_query = `PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
  ASK WHERE { GRAPH bk:${data} { ?s ?p ?o } }`;

  const ask = await client.query.ask(ask_query);

  return ask;
}

async function AuthorityExist(graph, metadata, token) {
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const ask_query = `PREFIX madsrdf:  <http://www.loc.gov/mads/rdf/v1#> 
      PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
      PREFIX lc: <http://id.loc.gov/authorities/subjects/>
      ASK WHERE { GRAPH  bk:${graph} 
            {?s madsrdf:${metadata} lc:${token}
        }}`;

  const ask = await client.query.ask(ask_query);

  return ask;
}

async function ParserData(translate, subjectDetails, autorityBK) {
  const entries = Object.entries(translate);

  const narrowers = new Array();
  const broaders = new Array();
  const variants = new Array();
  const reciprocalAuthority = new Array();

  let data = Object.assign({}, translate);

  entries.forEach(([k, v]) => {
    if (k.includes("narrower")) {
      narrowers.push(v);
      delete data[`${k}`];
    } else if (k.includes("variant")) {
      variants.push(v);
      delete data[`${k}`];
    } else if (k.includes("reciprocalAuthority")) {
      //let token = v.uri.split("/")[5];
      reciprocalAuthority.push(v);
      delete data[`${k}`];
    } else if (k.includes("broader")) {
      broaders.push(v);
      delete data[`${k}`];
    }
  });

  data["narrower"] = narrowers;
  data["broader"] = broaders;
  data["variant"] = variants;
  data["reciprocalAuthority"] = reciprocalAuthority;
  data["exactExternalAuthority"] = subjectDetails.exactExternalAuthority;
  data["closeExternalAuthority"] = subjectDetails.closeExternalAuthority;
  data["tokenLSCH"] = subjectDetails.tokenLSCH;

  return data;
}

export default function Translate({
  open,
  setOpen,
  setOpenLCSH,
  setOpenBK,
  subjectDetails,
  setSubjectBK,
}) {
  //console.log("T", subjectDetails)
  const [translate, setTranslate] = useState({});
  const [sugestTranslate, setSugestTranslate] = useState({});
  const [agree, setAgree] = useState(false);
  const form = useRef(null);

  function getTranslate(termo) {
    api
      .post(`/translate/${termo}`)
      .then((response) => {
        setTranslate((prevState) => ({
          ...prevState,
          note: { value: response.data.translate, lang: "pt" },
        }));
        setSugestTranslate((prevState) => ({
          ...prevState,
          note: { value: response.data.translate, lang: "pt" },
        }));
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  useEffect(() => {
    console.log("T", subjectDetails)
    if (subjectDetails?.note) {
      getTranslate(subjectDetails?.note);
    }
  }, [subjectDetails?.note]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAceptAll = () => {
    setTranslate(sugestTranslate);
    setAgree(true);
  };

  const checkTranslate = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleSalve = async (e) => {
    const autorityBK = { graph: subjectDetails.tokenLSCH, data: [] };

    e.preventDefault();

    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/thesaurus/sparql",
    });

    const values = Object.values(translate);
    const langs = values.filter(function (item) {
      return item.lang == "eng";
    });
    if (langs.length > 0) {
      alert(JSON.stringify("Todos os termos precisam ser traduzidos"));
    } else {
      const data = await ParserData(translate, subjectDetails, autorityBK);
      //console.log(data)
      api
        .post("/thesaurus/subject", await data)
        .then((response) => {
          if (response.status == 201) {
            ParserBK(response.data.uri, setSubjectBK);
            setOpen(false);
            setOpenLCSH(false);
            alert(JSON.stringify("Assunto salvo com sucesso!!"));
          }
        })
        .catch(function (error) {
          console.log("ERROOO!!", error);
          alert(JSON.stringify("Problema ao salvar este registro"));
        });
    }
  };

  return (
    <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="div">Traduzir Termo</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form ref={form} onSubmit={handleSalve}>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Notas */}
            {subjectDetails?.note && (
              <Box sx={{ width: "100%", p: "0.5rem" }}>
                <Typography variant="subtitle2">Nota:</Typography>
                <TextareaAutosize
                  aria-label="note"
                  minRows={3}
                  value={translate.note?.value}
                  onChange={(e) => {
                    setTranslate((prevState) => ({
                      ...prevState,
                      note: { value: e.target.value, lang: "pt" },
                    }));
                  }}
                  style={{ width: "100%" }}
                />
              </Box>
            )}
            <Grid item xs={6}>
              <Box pt={"0.5rem"}>
                <Typography variant="subtitle2">Termo principal:</Typography>
                <Box sx={{ p: "1rem" }}>
                  <MakeTranslate
                    termo={subjectDetails?.authority}
                    metadata={"authority"}
                    setTranslate={setTranslate}
                    translate={translate}
                    sugestTranslate={sugestTranslate}
                    setSugestTranslate={setSugestTranslate}
                    label={"Assunto"}
                    agree={agree}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              {/* Termo relacionado */}
              {subjectDetails?.reciprocalAuthority && (
                <Box pt={"0.5rem"}>
                  <Typography variant="subtitle2">
                    Termo relacionado:
                  </Typography>
                  <List dense={true}>
                    {subjectDetails.reciprocalAuthority.map(
                      (reciprocalAuthority, index) => (
                        <ListItem key={index} sx={{ p: "0.5rem" }}>
                          <MakeTranslate
                            termo={reciprocalAuthority.label}
                            uri={reciprocalAuthority.uri}
                            metadata={`reciprocalAuthority.${index}`}
                            setTranslate={setTranslate}
                            translate={translate}
                            sugestTranslate={sugestTranslate}
                            setSugestTranslate={setSugestTranslate}
                            label={"Termo relacionado"}
                            agree={agree}
                          />
                        </ListItem>
                      )
                    )}
                  </List>
                </Box>
              )}
            </Grid>
            {/* Variantes */}
            <Grid item xs={6}>
              {subjectDetails?.variant && (
                <Box pt={"0.5rem"}>
                  <Typography variant="subtitle2">Variantes:</Typography>
                  <List dense={true}>
                    {subjectDetails.variant.map((variant, index) => (
                      <ListItem key={index} sx={{ p: "0.5rem" }}>
                        <MakeTranslate
                          termo={variant}
                          metadata={`variant.${index}`}
                          setTranslate={setTranslate}
                          translate={translate}
                          sugestTranslate={sugestTranslate}
                          setSugestTranslate={setSugestTranslate}
                          label={"Variante"}
                          agree={agree}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>
            {/* Termos Generico */}
            {subjectDetails?.broader.length > 0 && (
              <Grid item xs={6}>
                <Box pt={"0.5rem"}>
                  <Typography variant="subtitle2">Termos Generico:</Typography>
                  <List dense={true}>
                    {subjectDetails.broader.map((broader, index) => (
                      <ListItem key={index} sx={{ p: "0.5rem" }}>
                        <MakeTranslate
                          termo={broader.label}
                          uri={broader.uri}
                          metadata={`broader.${index}`}
                          setTranslate={setTranslate}
                          translate={translate}
                          sugestTranslate={sugestTranslate}
                          setSugestTranslate={setSugestTranslate}
                          label={"Termo genérico"}
                          agree={agree}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            )}
            {/* Termos Restritos */}

            {subjectDetails?.narrower && (
              <Grid item xs={6}>
                <Box pt={"0.5rem"}>
                  <Typography variant="subtitle2">
                    Termos Especifíco:
                  </Typography>
                  <List dense={true}>
                    {subjectDetails.narrower.map((narrower, index) => (
                      <ListItem key={index} sx={{ p: "0.5rem" }}>
                        <MakeTranslate
                          termo={narrower.label}
                          uri={narrower.uri}
                          metadata={`narrower.${index}`}
                          setTranslate={setTranslate}
                          translate={translate}
                          sugestTranslate={sugestTranslate}
                          //subjectDetails={subjectDetails}
                          setSugestTranslate={setSugestTranslate}
                          label={"Termo restrito"}
                          agree={agree}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAceptAll}>Aceitar Todos</Button>
          <Button type="submit">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
