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
  DialogActions
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import { Search, Close } from "@mui/icons-material/";

// React Hooks
import { useState } from "react"; 

// BiblioKeia Components
import Title from "./title";
import Contribution from "./contribution";
import Identifiers from "./identifiers";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";
import { useProgress } from "src/providers/progress";
import { useAlertBK } from "src/providers/alerts";

// BiblioKeia Services
import { api } from "src/services/api/api";
import { SolrSerieByID } from "src/services/solr/searchSerie";

export default function CreateSerie({ open, setOpen, setSerieDetails }) {

  const { serie, setSerie } = useBf();
  const { setProgress } = useProgress();
  const { setOpenSnack, setMessage, setTypeAlert } = useAlertBK();

  function postSerie(serie) {
    setProgress(true);
    api
      .post(`/cataloguing/serie`, serie)
      .then((response) => {
        setProgress(false);
        if (response.status == 201) {
          //console.log(response.data);
          SolrSerieByID(response.data.id, setSerieDetails )
          setTypeAlert("success");
          setMessage("Registro salvo com sucesso!");
          setOpenSnack(true);
          setOpen(false)
        }
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSalve = () => {
    postSerie(serie)
  }

  return (
    <Dialog fullWidth maxWidth={"lg"} open={open} onClose={handleClose}>
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
        <Title />
        <Contribution />
        <Identifiers />

      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSalve}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
