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
import ParserBK from "src/services/thesaurus/parser_bk";
import ParserLCSH from "src/services/thesaurus/parser_lcsh";

// BiblioKeia Components
import Variants from "src/admin/components/thesaurus/variant";
import ReciprocalAuthority from "src/admin/components/thesaurus/reciprocalAuthority";
import Broader from "src/admin/components/thesaurus/broader";
import Narrower from "src/admin/components/thesaurus/narrower";

async function GraphExist(token) {
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const ask_query = `PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
    ASK WHERE { GRAPH bk:${token} { ?s ?p ?o } }`;

  const ask = await client.query.ask(ask_query);

  return ask;
}

export default function CardThesaurus({ subjectDetails, setSubjectDetails }) {
  const [choise, setChoise] = useState(false);
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [openTranslate, setOpenTranslate] = useState(false);
  const [autorityBK, setAutorityBK] = useState(null);

  const [subjectBK, setSubjectBK] = useState(null);

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
        console.log(thesarus)
      ParserBK(uri, setSubjectDetails);
    } else {
      ParserLCSH(token, setSubjectBK);
    }
  };

  console.log(subjectDetails);
  return (
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
            {subjectDetails.variant.length > 0 && (
              <Grid item xs={6}>
                {/* variant */}
                <Variants authoritys={subjectDetails.variant} />
              </Grid>
            )}

            {/* reciprocalAuthority */}
            {subjectDetails.reciprocalAuthority && (
              <Grid item xs={6}>
                <ReciprocalAuthority
                  authoritys={subjectDetails.reciprocalAuthority}
                  setSubjectDetails={setSubjectDetails}
                />
              </Grid>
            )}

            {/* broader Term */}
            {subjectDetails?.broader.length > 0 && (
              <Grid item xs={6}>
                <Broader
                  setSubjectDetails={setSubjectDetails}
                  authoritys={subjectDetails.broader}
                />
              </Grid>
            )}

            {/* narrower */}
            {subjectDetails?.narrower.length > 0 && (
              <Grid item xs={6}>
                <Narrower
                  setSubjectDetails={setSubjectDetails}
                  authoritys={subjectDetails.narrower}
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
