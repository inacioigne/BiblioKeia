// MUI
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  Typography,
  Divider,
  DialogContent,
  Grid,
  List,
  ListItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  ListItemText,
  Pagination,
} from "@mui/material/";
import TranslateIcon from "@mui/icons-material/Translate";
import { Search, Clear, FileDownloadDone } from "@mui/icons-material/";

// React Hooks
import { useState, useEffect } from "react";

// SparqlClient
import SparqlClient from "sparql-http-client";

// BiblioKeia Services
import ParserBK from "src/services/thesaurus/subjects/parserBK";
import ParserLCSH from "src/services/thesaurus/subjects/parserLCSH";

// BiblioKeia Components
import Variants from "./variant";
import Authorities from "./listAuthority";
import Translate from "../translate";

async function GraphExist(token) {
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/authorities/sparql",
  });

  const ask_query = `PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
      ASK WHERE { GRAPH bk:${token} { ?s ?p ?o } }`;

  const ask = await client.query.ask(ask_query);

  return ask;
}

export default function CardLCSH({
  subjectDetails,
  setSubjectDetails,
  setOpenBK,
  setOpenLCSH,
  setSubjectBK,
}) {
  const [choise, setChoise] = useState(false);
  const [subject, setSubject] = useState("");
  const [active, setActive] = useState(false);
  const [autorityBK, setAutorityBK] = useState(null);
  const [openTranslate, setOpenTranslate] = useState(false);

  useEffect(() => {
    if (subjectDetails?.tokenLSCH) {
      (async () => {
        let graph = await GraphExist(subjectDetails?.tokenLSCH);
        if (graph) {
          let uri = `https://bibliokeia.com/authorities/subjects/${subjectDetails.tokenLSCH}`;
          setAutorityBK(uri);
          return;
        } else {
          setAutorityBK(null);
          return;
        }
      })();
    } else {
      setAutorityBK(null);
    }
  });

  const handleChoose = () => {
    setChoise(subject.authority);
    setSubject("");
    setOpen(false);
    setActive(true);
  };

  const getThesarus = (uri) => {
    let uris = uri.split("/");
    let thesarus = uris[2];
    let token = uris[5];

    if (thesarus == "bibliokeia.com") {
      ParserBK(uri, setSubjectDetails);
    } else {
      ParserLCSH(token, setSubjectDetails);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">{subjectDetails?.authority}</Typography>
            {subjectDetails.thesarus == "BKSH" ? (
              <Tooltip title="Escolher">
                <IconButton
                  color="primary"
                  component="label"
                  onClick={handleChoose}
                >
                  <FileDownloadDone />
                </IconButton>
              </Tooltip>
            ) : autorityBK ? (
              <Button
                onClick={() => {
                  getThesarus(autorityBK);
                }}
              >
                BKSH
              </Button>
            ) : (
              <Tooltip title="Traduzir">
                <IconButton
                  color="primary"
                  component="label"
                  onClick={() => {
                    setOpenTranslate(true);
                  }}
                >
                  <TranslateIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Divider />
          <Box px={"1rem"}>
            <Typography
              pt={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {subjectDetails?.note}
            </Typography>
            <Grid container spacing={2}>
              {subjectDetails?.variant && (
                <Grid item xs={6}>
                  {/* variant */}
                  <Variants authoritys={subjectDetails.variant} />
                </Grid>
              )}

              {/* reciprocalAuthority */}
              {subjectDetails?.reciprocalAuthority && (
                <Grid item xs={6}>
                  <Authorities
                    label={"Termos Relacionados"}
                    setSubjectDetails={setSubjectDetails}
                    authorities={subjectDetails.reciprocalAuthority}
                  />
                </Grid>
              )}

              {/* broader Term */}
              {subjectDetails?.broader.length > 0 && (
                <Grid item xs={6}>
                  <Authorities
                    label={"Termos Genéricos"}
                    setSubjectDetails={setSubjectDetails}
                    authorities={subjectDetails.broader}
                  />
                </Grid>
              )}

              {/* narrower */}
              {subjectDetails.narrower && (
                <Grid item xs={6}>
                  <Authorities
                    label={"Termos especifícos"}
                    setSubjectDetails={setSubjectDetails}
                    authorities={subjectDetails.narrower}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Translate
        open={openTranslate}
        setOpen={setOpenTranslate}
        subjectDetails={subjectDetails}
        setOpenLCSH={setOpenLCSH}
        setOpenBK={setOpenBK}
        setSubjectBK={setSubjectBK}
      />
    </>
  );
}
