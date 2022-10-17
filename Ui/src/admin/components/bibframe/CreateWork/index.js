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
} from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import SearchLCNAF from "src/admin/components/bibframe/search_LCNAF";
import { api } from "src/services/lcnfa";
import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";
import Relationship from "./relationship";
import Authority from "./authority";

export default function CreateWork() {
  const [type, setType] = useState("person");
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState(null);
  const [hits, setHits] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu1 = Boolean(anchorEl);
  const [openMenu, setopenMenu] = useState(null);
  const [relators, setRelators] = useState(null);

  const getData = (data) => {
    api
      .get("suggest2", {
        params: {
          q: `${data.authority}`,
          rdftype: `${data.type}`,
        },
      })
      .then((response) => {
        //console.log("LCNFA: ", response.data);
        setHits(response.data.hits);
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget.position);
  };

  const handleCloseMenu = () => {
    // console.log("close");
    setAnchorEl(null);
    setopenMenu(false);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "PersonalName",
      authority: "",
      relationship: "",
    },
  });

  const handleSearch = (data) => {
    setOpen(true);
    //setSearch(data)
    console.log("SEARCH: ", data);
    getData(data);
  };

  // async function getRelators(data) {
  //   const client = new SparqlClient({
  //     endpointUrl: "http://localhost:3030/relators/sparql",
  //   });
  //   const query = `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
  //   SELECT ?object
  //   WHERE {
  //     ?subject madsrdf:authoritativeLabel ?object
  //     FILTER regex(?object, "^${data}") 
  //   }
  //   LIMIT 10`;

  //   const stream = await client.query.select(query);

  //   const dataset = rdf.dataset();
  //   await dataset.import(stream);
  //   let r = [];
  //   for (const quad of dataset) {
  //     r.push(quad.object.value);
  //   }
  //   if (r.length != 0) {
  //     console.log("T:", r);
  //     setRelators(r);
  //   } else {
  //     setRelators(null);
  //     console.log("0: ", r);
  //   }
  // }

  // const handleOnChange = (str) => {
  //   let data = str.charAt(0).toUpperCase() + str.slice(1);
  //   getRelators(data);
  //   // console.log(relators)
  // };

  return (
    <Box bgcolor={grey[100]} onMouseLeave={handleCloseMenu}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Creator of Work
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
          <form //onSubmit={handleSubmit(handleSearch)}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <InputLabel id="type">Tipo</InputLabel>
                    <Select {...field} label="Tipo">
                      <MenuItem value={"PersonalName"}>Person</MenuItem>
                      <MenuItem value={"family"}>Family</MenuItem>
                      <MenuItem value={"CorporateName"}>Corporate</MenuItem>
                      <MenuItem value={"jurisdiction"}>Jurisdiction</MenuItem>
                      <MenuItem value={"conference"}>Conference</MenuItem>
                      <MenuItem value={"NameTitle"}>Name Title</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              {/* <Controller
                control={control}
                name="authority"
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Search LCNAF"
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
                )}
              /> */}
                 {/** Authority*/}
              <Authority />
              {/** Relationship Designator */}
              <Relationship />
              
            </Box>
          </form>
        </Paper>

        <SearchLCNAF
          open={open}
          setOpen={setOpen}
          search={search}
          control={control}
          handleSearch={handleSearch}
          handleSubmit={handleSubmit}
          hits={hits}
        />
      </Box>
    </Box>
  );
}
