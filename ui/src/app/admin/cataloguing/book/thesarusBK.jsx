// MUI
import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors/";

import queryThesaurusBK from "src/services/thesaurus/subjects/thesaurusBk";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Components
import SearchBK from "src/components/thesaurus/subjects/searchBK";

export default function ThesarusBK({
  listSubject,
  setListSubject,
  index,
  defaultSubject,
  defaultUri,
}) {
  const [subject, setSubject] = useState("");
  const [active, setActive] = useState(false);
  const [choise, setChoise] = useState(false);
  const [subjectBK, setSubjectBK] = useState(null);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    setOpen(true);
    queryThesaurusBK(subject, setResponse);
  };

  const handleChoose = () => {
 
    setChoise(subjectBK.authority);
    listSubject[index] = {label: subjectBK.authority, uri: subjectBK.uri}
    // console.log("ch: ", listSubject)
    setListSubject(listSubject)
    setWork((prevState) => ({
      ...prevState,
      subjects: listSubject,
    }));

    setSubject("");
    setOpen(false);
    setActive(true);
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
            {subjectBK.authority}
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
