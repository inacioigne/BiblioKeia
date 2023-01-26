// MUI
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  DialogContent,
  Grid,
  Box,
  List,
  ListItem,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import { Search, Close } from "@mui/icons-material/";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Components
import CreateSerie from "./createSerie";
import CardSerie from "src/components/cards/cardSerie";
// BiblioKeia Services
import {SolrSerie} from "src/services/solr/searchSerie";

export default function SearchSerie({
  open,
  setOpen,
  value,
  setValue,
  handleChoose,
  serieDetails,
  setSerieDetails,
  response,
  setResponse,
}) {
  const [openCreate, setOpenCreate] = useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  const inputPros = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          component="button"
          onClick={() => {
            setOpen(true);
            //console.log("ok");
          }}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <>
      <Dialog fullWidth maxWidth={"xl"} open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="div">Séries</Typography>
          <IconButton color="primary" component="label" onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={5} sx={{ borderRight: "solid 1px", pr: "1rem" }}>
              <TextField
                fullWidth
                onChange={(e) => {
                  setValue(e.target.value);
                  SolrSerie(e.target.value, setResponse);
                }}
                value={value}
                label="Série"
                InputProps={inputPros}
              />
              {response.length > 0 ? (
                <Box>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{
                      mt: "0.5rem",
                    }}
                  >
                    <i>Resultados:</i>
                  </Typography>
                  <List>
                    {response.map((serie, index) => (
                      <ListItem key={index} disablePadding>
                        <Button
                          onClick={() => {
                            console.log(serie);
                            setSerieDetails(serie);
                          }}
                        >
                          {serie.mainTitle}
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Box pt={"0.5rem"}>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    sx={{
                      mt: "0.5rem",
                    }}
                  >
                    <i>Nenhum registro encontrado::</i>
                  </Typography>
                  <Button
                    onClick={() => {
                      setOpenCreate(true);
                    }}
                  >
                    Criar registros
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={7}>
              {serieDetails && (
                <CardSerie
                  serieDetails={serieDetails}
                  handleChoose={handleChoose}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <CreateSerie open={openCreate} setOpen={setOpenCreate} setSerieDetails={setSerieDetails} />
    </>
  );
}
