import {
  TextField,
  Box,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  Typography,
  Divider,
  DialogContent,
  Grid,
  List,
  ListItem,
  Button,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import queryThesaurusBK from "src/services/thesaurus/thesaurusBk";
import ThesaurusLCSH from "./thesaurusLCSH"

export default function ThesarusBK() {
  const [subject, setSubject] = useState("");
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLCSH, setOpenLCSH] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    //console.log(subject);
    setOpen(true);
    queryThesaurusBK(subject, setResponse);
  };

  const handleSearchAdv = (e) => {
    e.preventDefault();
    console.log(subject);
    //setOpen(true);
  };

  const inputPros = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          //component="button"
          type="submit"
          //onClick={handleSearch}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  const inputProsAdv = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          //component="button"
          type="submit"
          //onClick={handleSearchAdv}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form onSubmit={handleSearch}>
        <TextField
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          value={subject}
          fullWidth
          label="Assunto"
          InputProps={inputPros}
        />
      </form>
      {/* <code>{response}</code> */}
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="div">Thesaurus BiblioKeia</Typography>
          <IconButton color="primary" component="label" onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item xs={5} sx={{ borderRight: "solid 1px" }}>
              <form onSubmit={handleSearchAdv}>
                <TextField
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                  value={subject}
                  fullWidth
                  label="Assunto"
                  InputProps={inputProsAdv}
                />
              </form>
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
                {response.map((subject, index) => (
                  <ListItem key={index} disablePadding>
                    <Button>{subject}</Button>
                  </ListItem>
                ))}
              </List>
              </Box>): (
              <Box pt={"0.5rem"}>
                <i>Nenhum registro encontrado:</i> 
                <Button onClick={() => {setOpenLCSH(true)}}>Importar registros</Button>

                </Box>)}
              
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <ThesaurusLCSH open={openLCSH} setOpen={setOpenLCSH} />
    </Box>
  );
}
