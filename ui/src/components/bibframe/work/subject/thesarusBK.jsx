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
  Card,
  CardContent,
  Tooltip,
  ListItemText,
  Badge,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors/";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Services
import queryThesaurusBK from "src/services/thesaurus/subjects/thesaurusBk";
import ParserBK from "src/services/thesaurus/subjects/parserBK";

// BiblioKeia Components
import SearchBK from "src/components/thesaurus/subjects/searchBK";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";



async function GraphExist(token) {
  const client = new SparqlClient({
    endpointUrl: "http://localhost:3030/thesaurus/sparql",
  });

  const ask_query = `PREFIX bk: <https://bibliokeia.com/authorities/subjects/>
    ASK WHERE { GRAPH bk:${token} { ?s ?p ?o } }`;

  const ask = await client.query.ask(ask_query);

  return ask;
}

export default function ThesarusBK({listSubject, setListSubject, index, defaultSubject, defaultUri}) {

  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([]);
  const [subject, setSubject] = useState("");
  const [active, setActive] = useState(false);
  const [choise, setChoise] = useState(false);
  const [subjectBK, setSubjectBK] = useState(null);
  const [autorityBK, setautorityBK] = useState(null);

  const { work, setWork } = useBf();
  

  useEffect(() => {
    // setSubjectBK({authority: defaultSubject.label})
    // setChoise(true)
    //ParserBK(subject.uri, setSubjectBK);
    

    if (defaultSubject) {
      ParserBK(defaultUri, setSubjectBK)
      setChoise(true)
    }

    if (subjectBK?.tokenLSCH) {
      console.log("subjectBK", subjectBK)
      (async () => {
        let graph = await GraphExist(subjectBK?.tokenLSCH);
        if (graph) {
          let uri = `https://bibliokeia.com/authorities/subjects/${subjectBK.tokenLSCH}`;
          setautorityBK(uri);
          return;
        } else {
          setautorityBK(null);
          return;
        }
      })();
    } else {
      setautorityBK(null);
    }
  }, [defaultSubject]);
  
  const handleChoose = () => {
 
    setChoise(subjectBK.authority);
    listSubject[index] = {label: subjectBK.authority, uri: subjectBK.uri}
    // console.log("ch: ", listSubject)
    setListSubject(listSubject)
    setWork((prevState) => ({
      ...prevState,
      subjects: listSubject,
    }));

    //setListSubject(prevSate => [...prevSate, {label: subjectBK.authority, uri: subjectBK.uri}])
    setSubject("");
    setOpen(false);
    setActive(true);
  };

  const handleRecuse = () => {
    let recuse = listSubject.filter((value) => {return subjectBK.authority !== value.label })
    setListSubject(recuse)
    setChoise(false);
    setActive(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOpen(true);
    queryThesaurusBK(subject, setResponse);
  };

  const inputPros = {
    startAdornment: choise && (
      <InputAdornment position="start">
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            display: "flex",
          }}
        >
          <Box
            sx={{
              borderRight: "solid 1px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              px: "5px",
              pt: "2px",
              backgroundColor: blue[200],
            }}
          >
            {subjectBK?.authority}
          </Box>
          <Close
            sx={{
              fontSize: "25px",
              px: "5px",
              color: blue[800],
              backgroundColor: red[200],
              cursor: "pointer",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
            onClick={handleRecuse}
          />
        </Typography>
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          type="submit"
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Box sx={{ width: "100%" }}>
    

      <form onSubmit={handleSearch}>
        <TextField
          disabled={active}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          value={subject}
          fullWidth
          label="Assunto"
          InputProps={inputPros}
        />
      </form>
      <SearchBK
        open={open}
        setOpen={setOpen}
        subject={subject}
        response={response}
        setResponse={setResponse}
        setSubject={setSubject}
        subjectBK={subjectBK}
        setSubjectBK={setSubjectBK}
        setChoise={setChoise}
        handleChoose={handleChoose}
      />
    </Box>
  );
}
