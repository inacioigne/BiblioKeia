// Material UI
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

import { Search, Close } from "@mui/icons-material";
import { useState } from "react";
import SearchLCNAF from "./search_LCNAF";
import { api } from "src/services/lcnfa";
import { blue, red } from "@mui/material/colors/";
// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Authority() {
  const { work, setWork } = useBf();
  const [value, setValue] = useState("Lorem ipsum");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(null);
  const [hits, setHits] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("PersonalName");

  const getData = (name, type) => {
    api
      .get("suggest2", {
        params: {
          q: `${name}`,
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
    getData(name, type);
  };

  const inputPros = {
    disabled: disabled,
    startAdornment:
      work.contributionAgent !== "" ? (
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
              {work.contributionAgent}
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
              onClick={() => {
                setDisabled(false);
                setWork((prevState) => ({
                  ...prevState,
                  contributionAgent: "",
                }));
              }}
            />
          </Typography>
        </InputAdornment>
      ) : null,
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          component="button"
          // type="submit"
          // onSubmit={handleSearch}
          onClick={handleSearch}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <>
      {/* <form onSubmit={handleSearch}> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="type">Tipo</InputLabel>
          <Select
            label="Tipo"
            onChange={(event) => {
              setType(event.target.value);
            }}
            value={type}
          >
            <MenuItem value={"PersonalName"}>Person</MenuItem>
            <MenuItem value={"family"}>Family</MenuItem>
            <MenuItem value={"CorporateName"}>Corporate</MenuItem>
            <MenuItem value={"jurisdiction"}>Jurisdiction</MenuItem>
            <MenuItem value={"conference"}>Conference</MenuItem>
            <MenuItem value={"NameTitle"}>Name Title</MenuItem>
          </Select>
        </FormControl>

        <TextField
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          fullWidth
          label="Search LCNAF"
          InputProps={inputPros}
        />
      </Box>
      {/* </form> */}

      <SearchLCNAF
        open={open}
        setOpen={setOpen}
        name={name}
        setName={setName}
        type={type}
        setType={setType}
        search={search}
        handleSearch={handleSearch}
        hits={hits}
        setValue={setValue}
        setDisabled={setDisabled}
      />
    </>
  );
}
