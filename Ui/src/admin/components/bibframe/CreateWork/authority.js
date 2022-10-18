import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  MenuItem,
  MenuList,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { useState } from "react";
import SearchLCNAF from "./search_LCNAF";
import { useForm, Controller } from "react-hook-form";
import { api } from "src/services/lcnfa";
import { blue, red } from "@mui/material/colors/";

export default function Authority() {
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
    console.log(name, type);
    setOpen(true);
    // setSearch(data);
    getData(name, type);
  };

  const inputPros = {
    disabled: disabled,
    startAdornment: disabled ? (
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
            {value}
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
          type="submit"
          onSubmit={handleSearch}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <>
      <form onSubmit={handleSearch}>
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
      </form>

      <SearchLCNAF
        open={open}
        setOpen={setOpen}
        name={name}
        setName={setName}
        type={type}
        setType={setType}
        search={search}
        //control={control}
        handleSearch={handleSearch}
        //handleSubmit={handleSubmit}
        hits={hits}
        setValue={setValue}
        setDisabled={setDisabled}
      />
    </>
  );
}
