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
import { useState } from "react";

// BiblioKeia Components
import CreateSerie from "./createSerie";

export default function SearchSerie({ open, setOpen, value, setValue }) {
  const [response, setResponse] = useState(null);
  const [openCreate, setOpenCreate] = useState(false)

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
            console.log("ok");
          }}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <>
    <Dialog fullWidth maxWidth={"md"} open={open} onClose={handleClose}>
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
        <Grid container>
          <Grid item xs={5} sx={{ borderRight: "solid 1px", pr: "1rem" }}>
            <TextField
              fullWidth
              //onClick={handleClick}
              onChange={(e) => {
                setValue(e.target.value);
                //GetType(e.target.value, setContentTypes);
              }}
              value={value}
              label="Série"
              InputProps={inputPros}
            />
            {response ? (
              <Box></Box>
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
                    setOpenCreate(true)
                  }}
                >
                  Criar registros
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      
    </Dialog>
    <CreateSerie open={openCreate} setOpen={setOpenCreate} />
    </>
    
  );
}
