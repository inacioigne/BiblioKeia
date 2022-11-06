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
import { useBf } from "src/providers/bibframe"

export default function Type(
  //{ values, setValues }
  ) {

  const { bf, setBf } = useBf()

  const [openMenu, setOpenMenu] = useState(null);
  const [contentTypes, setContentTypes] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState("");


  async function getContentTypes(data) {

    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/contentTypes/sparql",
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
      setContentTypes(r);
    } else {
      setContentTypes(null);
    }
  }

  const handleOnChange = (str) => {

    getContentTypes(str);

  };

  const handleClick = (e) => {
    if (disabled == false) {
      let rect = e.currentTarget.getBoundingClientRect();
      setOpenMenu(rect.top + rect.height);
      getContentTypes("");
    }
  };

  const handleCloseMenu = (relator) => {
    //console.log('OnChange', relator.target.innerText)
    setOpenMenu(false);
    setDisabled(true);
    setValue("");
    setBf((prevState) => ({
      ...prevState,
      contentType: relator.target.innerText,
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
            {bf.contentType}
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
        name="contentType"
        fullWidth
        onClick={handleClick}
        onChange={(e) => {
          handleOnChange(e.target.value);
          //setName(e.target.value);
          // setValues((prevState) => ({
          //   ...prevState,
          //   contentType: e.target.value,
          // }));
        }}
        //value={values?.contentType}
        label="Conteúdo"
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
          {contentTypes ? (
            contentTypes?.map((type, index) => (
              <MenuItem key={index} onClick={handleCloseMenu}>
                {type}
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
