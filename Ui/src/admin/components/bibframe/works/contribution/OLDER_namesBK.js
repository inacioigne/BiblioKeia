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

// React Hooks
import { useState } from "react";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// BiblioKeia Components
import SearchBK from "src/admin/components/thesaurus/names/searchBK"

export default function NamesBK() {
  const [type, setType] = useState("PersonalName");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(null);

  const { work, setWork } = useBf();

  const handleSearch = (e) => {
    e.preventDefault();
    setOpen(true);
    // getData(name, type);
    console.log("NBK", e);
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
          type="submit"
          onClick={handleSearch}
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
            <MenuItem value={"PersonalName"}>Nome Pessoal</MenuItem>
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
          label="Autor"
          InputProps={inputPros}
        />
      </Box>
    </form>
    <SearchBK 
        open={open}
        setOpen={setOpen}
        search={search}
    />


    </>
   
  );
}
