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

export default function CreateSerie({ open, setOpen }) {

  const { serie, setSerie } = useBf();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSalve = () => {
    console.log(serie)
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
