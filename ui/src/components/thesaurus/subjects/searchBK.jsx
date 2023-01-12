// MUI
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
  Card,
  CardContent,
  Tooltip,
  ListItemText,
  Badge,
} from "@mui/material/";
import ClearIcon from "@mui/icons-material/Clear";
import { Search, Close } from "@mui/icons-material";

// BiblioKeia Services
import queryThesaurusBK from "src/services/thesaurus/subjects/thesaurusBk";
import ParserBK from "src/services/thesaurus/subjects/parserBK";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Components
import ThesaurusLCSH from "./thesaurusLCSH";
import CardThesaurusBKSH from "./cardBKSH";

export default function SearchBK({
  open,
  setOpen,
  subject,
  response,
  setResponse,
  setSubject,
  subjectBK,
  setSubjectBK,
  setChoise,
  handleChoose,
}) {
  const [openLCSH, setOpenLCSH] = useState(false);
  // const [openTranslate, setOpenTranslate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchAdv = (e) => {
    e.preventDefault();
    queryThesaurusBK(subject, setResponse);
  };

  const inputProsAdv = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton color="primary" aria-label="search" type="submit">
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
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
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ pr: "0.5rem", borderRight: "solid 1px" }}>
              <form onSubmit={handleSearchAdv}>
                <TextField
                  onChange={(e) => {
                    setSubject(e.target.value);
                    queryThesaurusBK(e.target.value, setResponse);
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
                        <Button
                          onClick={() => {
                            ParserBK(subject.uri, setSubjectBK);
                          }}
                        >
                          {subject.value}
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
                    <i>Nenhum registro encontrado:</i>
                  </Typography>
                  <Button
                    onClick={() => {
                      setOpenLCSH(true);
                    }}
                  >
                    Importar registros
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={8}>
              {subjectBK && (
                <CardThesaurusBKSH
                  subjectDetails={subjectBK}
                  setSubjectDetails={setSubjectBK}
                  setOpenBK={setOpen}
                  setChoise={setChoise}
                  handleChoose={handleChoose}
                />
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <ThesaurusLCSH
        open={openLCSH}
        setOpenLCSH={setOpenLCSH}
        setOpenBK={setOpen}
        setSubjectBK={setSubjectBK}
      />
    </>
  );
}
