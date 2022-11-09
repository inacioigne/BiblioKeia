import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuList,
  MenuItem,
  InputAdornment,
  IconButton
} from "@mui/material/";
import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";
import { useState } from "react";
// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
import { Search, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors/";

export default function Language({}) {
  const { bf, setBf } = useBf();
  const [languages, setLanguages] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");

  async function getLanguage(data) {
    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/language/sparql",
    });
    // const query = `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    // SELECT ?language ?code
    //  WHERE { 
    //      ?subject madsrdf:authoritativeLabel ?language .
    //   FILTER regex(?language, "^${data}") 
    //   ?subject madsrdf:code ?code }
    // LIMIT 10`;
    const query =  `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?language 
     WHERE { 
         ?subject madsrdf:authoritativeLabel ?language .
   
  }
    LIMIT 10`

    const stream = await client.query.select(query);

    const dataset = rdf.dataset();
    await dataset.import(stream);
    let r = [];
    for (const quad of dataset) {
        console.log(quad)
      r.push( quad.language.value  );
      
    }
    if (r.length != 0) {
      setLanguages(r);
    } else {
      setLanguages(null);
    }
  }

  const handleOnChange = (str) => {
    setValue(str)
    getLanguage(str);
  };

  const handleClick = (e) => {
    if (disabled == false) {
      let rect = e.currentTarget.getBoundingClientRect();
      setOpenMenu(rect.top + rect.height);
      getLanguage("");
    }
  };

  const handleCloseMenu = (language) => {
    setOpenMenu(false);
    setDisabled(true);
    setValue("");
    setBf((prevState) => ({
      ...prevState,
      language: language.target.innerText,
    }));
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
            {bf.language}
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
                <MenuItem key={index} onClick={handleCloseMenu}>
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
