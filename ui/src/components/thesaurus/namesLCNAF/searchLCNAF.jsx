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
import { Search, Close } from "@mui/icons-material";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Services
import { ApiLoc } from "src/services/apiLoc/loc";
import QueryLCNAF from "src/services/thesaurus/names/queryLCNAF";

// BiblioKeia Components
import CardLCNAF from "./cardLCNAF";

export default function SearchLCNAF({
  open,
  setOpen,
  name,
  setNameDetails,
  setImgBK,
}) {
  const [type, setType] = useState("PersonalName");
  const [nameLCNAF, setNameLCNAF] = useState(name);
  const [hits, setHits] = useState([]);
  const [LCNAFDetails, setLCNAFDetails] = useState(null);
  const [img, setImg] = useState(null);

  const getData = (name, type) => {
    ApiLoc.get("suggest2", {
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
    getData(name, type);
  }, []);

  const handleClose = () => {
    setOpen(false);
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
            </Box>
            <Box>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
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
            </Box>
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
