import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";
import { useState } from "react";
//import { Search, Close } from "@mui/icons-material";
import Thesaurus from "./thesaurus";
import Type from "./type";
import SearchSubject from "./searchSubject";
import { api } from "src/services/loc";

export default function SubjectField() {
  const [disabled, setDisabled] = useState(false);
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [hits, setHits] = useState([]);
  const [type, setType] = useState("SimpleType");

  const getData = (subject, type) => {
    //console.log(subject, type);
    api
      .get("authorities/subjects/suggest2/", {
        params: {
          q: `${subject}`,
          rdftype: `${type}`,
        },
      })
      .then((response) => {
        //console.log(response);
        setHits(response.data.hits);
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    setOpen(true);
    getData(subject, type);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <form onSubmit={handleSearch}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Type setType={setType} type={type} />
          <SearchSubject
            setSubject={setSubject}
            subject={subject}
            disabled={disabled}
            handleSearch={handleSearch}
          />
        </Box>
      </form>
      <Thesaurus
        open={open}
        setOpen={setOpen}
        //name={name}
        //setName={setName}
        setSubject={setSubject}
        subject={subject}
        disabled={disabled}
        type={type}
        setType={setType}
        //search={search}
        handleSearch={handleSearch}
        hits={hits}
        //setValue={setValue}
        setDisabled={setDisabled}
      />
    </Box>
  );
}
