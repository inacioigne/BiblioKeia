// Material UI
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Typography,
  Button,
  List,
  ListItem,
  Box,
  Grid,
} from "@mui/material";
//import ClearIcon from "@mui/icons-material/Clear";
import { Search, Close } from "@mui/icons-material";
import { api } from "src/services/lcnfa";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Components
import CardLCNAF from "src/admin/components/thesaurus/names/cardLCNAF";

// BiblioKeia Services
import QueryLCNAF from "src/services/thesaurus/names/queryLCNAF";

export default function SearchLCNAF({
  open,
  setOpen,
  name,
  setNameDetails,
  setImgBK,
}) {
  const [type, setType] = useState("PersonalName");
  const [nameLCNAF, setNameLCNAF] = useState("");
  const [hits, setHits] = useState([]);

  const [LCNAFDetails, setLCNAFDetails] = useState(null);
  const [img, setImg] = useState(null);

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

  useEffect(() => {
    if (name) {
      setNameLCNAF(name);
      getData(name, type);
    }

    //setName(search)
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    //setOpen(true);
    getData(name, type);
  };

  return (
    <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="div">Importar autoridades</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid item xs={5} sx={{ borderRight: "solid 1px", pr: "1rem" }}>
            <Box
              sx={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}
            >
              {/* <form onSubmit={handleSearch}> */}
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
                fullWidth
                value={nameLCNAF}
                onChange={(e) => {
                  setNameLCNAF(e.target.value);
                  getData(e.target.value, type);
                }}
                label="Search LCNAF"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        aria-label="search"
                        component="button"
                      >
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* </form> */}
            </Box>

            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                //textAlign: "center",
                mt: "0.5rem",
              }}
            >
              Resultados:
            </Typography>
            <List>
              {hits?.map((hit, index) => (
                <ListItem key={index} disablePadding>
                  <Button
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      QueryLCNAF(hit.uri, setLCNAFDetails, setImg);
                    }}
                  >
                    {hit.aLabel}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={7} sx={{ pl: "1rem" }}>
            {LCNAFDetails && (
              <CardLCNAF
                LCNAFDetails={LCNAFDetails}
                img={img}
                setOpen={setOpen}
                setNameDetails={setNameDetails}
                setImgBK={setImgBK}
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
