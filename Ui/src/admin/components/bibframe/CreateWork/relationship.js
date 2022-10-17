import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  MenuItem,
  MenuList,
} from "@mui/material/";
import { useState } from "react";
import { Search, Close } from "@mui/icons-material";
import { blue } from "@mui/material/colors/";

import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";

export default function Relationship() {
  const [openMenu, setOpenMenu] = useState(null);
  const [relators, setRelators] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("Lorem ipsum");
  const [name, setName] = useState("");

  async function getRelators(data) {
    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/relators/sparql",
    });
    const query = `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?object
    WHERE {
      ?subject madsrdf:authoritativeLabel ?object
      FILTER regex(?object, "^${data}") 
    }
    LIMIT 10`;

    const stream = await client.query.select(query);

    const dataset = rdf.dataset();
    await dataset.import(stream);
    let r = [];
    for (const quad of dataset) {
      r.push(quad.object.value);
    }
    if (r.length != 0) {
      setRelators(r);
    } else {
      setRelators(null);
    }
  }

  const handleOnChange = (str) => {
    let data = str.charAt(0).toUpperCase() + str.slice(1);
    getRelators(data);
  };

  const handleCloseMenu = (relator) => {
    setOpenMenu(false);
    setDisabled(true);
    setValue(relator.target.innerText);
    setName("");
  };

  const inputPros = {
    disabled: disabled,
    startAdornment: disabled ? (
      <InputAdornment position="start">
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{
            backgroundColor: blue[200],
            display: "flex",
            px: "5px",
            borderRadius: "5px",
          }}
        >
          <Box sx={{ borderRight: "solid 1px", pr: "5px" }}>{value}</Box>

          <Close
            sx={{
              fontSize: "25px",
              pl: "5px",
              color: blue[800],
              cursor: "pointer",
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
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <>
      <TextField
        onClick={(e) => {
          let rect = e.currentTarget.getBoundingClientRect();
          setOpenMenu(rect.top + rect.height);
        }}
        onChange={(e) => {
          handleOnChange(e.target.value);
          setName(e.target.value);
        }}
        value={name}
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
          {relators ? (
            relators?.map((relator, index) => (
              <MenuItem key={index} onClick={handleCloseMenu}>
                {relator}
              </MenuItem>
            ))
          ) : (
            <MenuItem>Nenhum resultado encontrado</MenuItem>
          )}
        </MenuList>
      </Paper>
    </>
  );
}
