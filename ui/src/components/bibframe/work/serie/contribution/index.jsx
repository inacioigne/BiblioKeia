// MUI
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Grid,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors/";

// BiblioKeia Components
import Type from "src/components/thesaurus/namesBK/inputs/type";
//import NamesBK from "src/components/thesaurus/namesBK";
//import Relationship from "src/components/thesaurus/relators";
//import SearchBK from "src/components/thesaurus/namesBK/searchBK"
import Relationship from "./relationship";
import SearchBK from "./searchBK";

// BiblioKeia Services
import SearchAuthority from "src/services/solr/searchAuthority";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// React Hooks
import { useState } from "react";

export default function Contribution() {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState([]);
  const [type, setType] = useState("CorporateName");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");

  const { serie, setSerie } = useBf();

  const handleSearch = (e) => {
    e.preventDefault();
    setOpen(true);
    SearchAuthority(name, type, setResponse);
  };

  const inputPros = {
    disabled: disabled,
    startAdornment:
      serie.contributionAgent !== "" ? (
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
              {serie.contributionAgent}
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
                setSerie((prevState) => ({
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
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <>
      <Box>
        <Typography variant="subtitle2" sx={{ p: "1rem" }}>
          Responsabilidades
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            px: "2rem",
            pb: "2rem",
          }}
        >
          <form onSubmit={handleSearch}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Type setType={setType} type={type} />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  name="authority"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                  value={value}
                  fullWidth
                  label="Autor"
                  InputProps={inputPros}
                />
                {/* <Authority
                value={name}
                setValue={setName}
                setDisabled={setDisabled}
                disabled={disabled}
              /> */}
              </Grid>
            </Grid>
          </form>
          {/* <NamesBK /> */}
          <Relationship />
        </Box>
      </Box>
      <SearchBK
        open={open}
        setOpen={setOpen}
        type={type}
        setType={setType}
        setValue={setValue}
        name={name}
        setName={setName}
        response={response}
        setResponse={setResponse}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </>
  );
}
