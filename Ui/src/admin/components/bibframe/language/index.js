import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuList,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material/";
import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";
import { useState } from "react";
// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
import { Search, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors/";

export default function Language() {
  const { work, setWork } = useBf();
  const [languages, setLanguages] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");

  async function getLanguage(data) {
    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/language/sparql",
    });

    const query = `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
      SELECT ?object ?code
      WHERE {
        ?subject madsrdf:authoritativeLabel ?object
        FILTER regex(?object, "^${data}") 
        ?subject madsrdf:code ?code
      }
      LIMIT 10`;

    const stream = await client.query.select(query);

    const dataset = rdf.dataset();
    await dataset.import(stream);
    let r = [];
    for (const quad of dataset) {
      let obj = { language: quad.object.value, code: quad.code.value };
      r.push(obj);
    }
    if (r.length != 0) {
      setLanguages(r);
    } else {
      setLanguages(null);
    }
  }

  const handleOnChange = (str) => {
    setValue(str);
    getLanguage(str);
  };

  const handleClick = (e) => {
    if (disabled == false) {
      let rect = e.currentTarget.getBoundingClientRect();
      setOpenMenu(rect.top + rect.height);
      getLanguage("");
    }
  };

  function handleCloseMenu(language) {
    setOpenMenu(false);
    setDisabled(true);
    setValue("");
    setWork((prevState) => ({
      ...prevState,
      language: language.language,
      languageCode: language.code,
    }));
  }

  const inputPros = {
    disabled: disabled,
    startAdornment: 
    work.language !== "" ? (
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
            {work.language}
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
            onClick={(e) => {
              setDisabled(false);
              setWork((prevState) => ({
                ...prevState,
                language: "",
              }));
              let rect = e.currentTarget.getBoundingClientRect();
              setOpenMenu(rect.top + rect.height + 19);
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
          //type="submit"
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Box p={"2rem"}>
      <Typography variant="subtitle2">Idioma</Typography>
      <Paper sx={{ p: "1rem", width: "30rem" }}>
        <TextField
          name="language"
          fullWidth
          onClick={handleClick}
          onChange={(e) => {
            handleOnChange(e.target.value);
          }}
          value={value}
          label="Idioma"
          InputProps={inputPros}
        />
        <Paper
          sx={
            openMenu
              ? {
                  display: "block",
                  position: "absolute",
                  zIndex: "100",
                  top: openMenu,
                }
              : { display: "none", position: "absolute", zIndex: "100" }
          }
        >
          <MenuList>
            {languages ? (
              languages?.map((language, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleCloseMenu(language);
                  }}
                >
                  {language.language}
                </MenuItem>
              ))
            ) : (
              <MenuItem>Nenhum resultado encontrado</MenuItem>
            )}
          </MenuList>
        </Paper>
      </Paper>
    </Box>
  );
}
