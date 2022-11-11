import {
  Box,
  //Typography,
  // TextField,
  // InputAdornment,
  // IconButton,
  // MenuItem,
  // FormControl,
  // InputLabel,
  // Select,
} from "@mui/material/";
import { useState } from "react";
//import { Search, Close } from "@mui/icons-material";
import Thesaurus from "./thesaurus";
import Type from "./type";
import SearchSubject from "./searchSubject";
import { api } from "src/services/loc";

export default function SubjectField({ listSubject, SetListSubject }) {
  const [disabled, setDisabled] = useState(false);
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [hits, setHits] = useState([]);
  const [type, setType] = useState("SimpleType");
  const [name, setName] = useState("");

  const getData = (subject, type) => {
    api
      .get("authorities/subjects/suggest2/", {
        params: {
          q: `${subject}`,
          rdftype: `${type}`,
        },
      })
      .then((response) => {
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
    setDisabled(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Type setType={setType} type={type} />
        <SearchSubject
          setSubject={setSubject}
          subject={subject}
          disabled={disabled}
          setDisabled={setDisabled}
          handleSearch={handleSearch}
          name={name}
          setName={setName}
        />
      </Box>

      <Thesaurus
        open={open}
        setOpen={setOpen}
        name={name}
        setName={setName}
        setSubject={setSubject}
        subject={subject}
        disabled={disabled}
        type={type}
        setType={setType}
        handleSearch={handleSearch}
        hits={hits}
        setDisabled={setDisabled}
        SetListSubject={SetListSubject}
        listSubject={listSubject}
      />
    </Box>
  );
}
