import {
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Stack,
  IconButton,
  Button,
  Paper,
  Menu,
  MenuItem,
  MenuList,
  Popover,
} from "@mui/material/";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";

export default function Relationship() {
  const [openMenu, setOpenMenu] = useState(null);
  const [relators, setRelators] = useState(null);

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
      console.log("T:", r);
      setRelators(r);
    } else {
      setRelators(null);
      console.log("0: ", r);
    }
  }

  const handleOnChange = (str) => {
    let data = str.charAt(0).toUpperCase() + str.slice(1);
    getRelators(data);
    // console.log(relators)
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <TextField
        onClick={(e) => {
          let rect = e.currentTarget.getBoundingClientRect();
          setOpenMenu(rect.top + rect.height);
        }}
        onChange={(e) => {
          console.log(e.target.value);
          handleOnChange(e.target.value);
        }}
        InputProps={{
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
        }}
      />
      <Paper
        sx={
          openMenu
            ? {
                display: "block",
                position: "absolute",
                zIndex: "100",
                top: openMenu, //202.859375 + 56,
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
