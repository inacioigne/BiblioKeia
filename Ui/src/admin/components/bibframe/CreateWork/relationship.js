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
import { blue, red } from "@mui/material/colors/";

import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Relationship() {
  const { bf, setBf } = useBf();

  const [openMenu, setOpenMenu] = useState(null);
  const [relators, setRelators] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("Lorem ipsum");
  const [name, setName] = useState("");

  async function getRelators(data) {
    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/relators/sparql",
    });
    const query = `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT *
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
      const relator = { uri: quad.subject.value, relator: quad.object.value };
      r.push(relator);

      //setRelators(prevState => [...prevState, relator])
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
  const handleClick = (e) => {
    if (disabled == false) {
      let rect = e.currentTarget.getBoundingClientRect();
      setOpenMenu(rect.top + rect.height);
      getRelators("");
    }
  };

  const handleCloseMenu = (relator) => {
    const obj = relators[relator.target.id]
    console.log('R', relators[relator.target.id])
    setOpenMenu(false);
    setDisabled(true);
    setValue(relator.target.innerText);
    setName("");
    setBf((prevState) => ({
      ...prevState,
      contributionRole: obj.relator,
      contributionRoleUri: obj.uri,
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
        onClick={handleClick}
        onChange={(e) => {
          handleOnChange(e.target.value);
          setName(e.target.value);
        }}
        value={name}
        label="Relationship Designator"
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
              <MenuItem key={index} id={index} onClick={handleCloseMenu}>
                {relator.relator}
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
