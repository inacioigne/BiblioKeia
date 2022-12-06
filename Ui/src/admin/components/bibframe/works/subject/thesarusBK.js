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
import { Search, Close } from "@mui/icons-material";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import queryThesaurusBK from "src/services/thesaurus/thesaurusBk";
import ThesaurusLCSH from "./thesaurusLCSH";
import ParserBK from "src/services/thesaurus/parser_bk";
import { FileDownloadDone } from "@mui/icons-material";
import ParserLCSH from "src/services/thesaurus/parser_lcsh";
import TranslateIcon from "@mui/icons-material/Translate";
import Translate from "src/admin/components/bibframe/works/subject/translate";
import { blue, red } from "@mui/material/colors/";

const styleIformation = {
  p: "0.5rem",
  display: "flex",
  gap: "0.5rem",
};

export default function ThesarusBK() {
  const [subject, setSubject] = useState("");
  const [subjectBK, setSubjectBK] = useState(null);
  const [response, setResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLCSH, setOpenLCSH] = useState(false);
  const [openTranslate, setOpenTranslate] = useState(false);
  const [choise, setChoise] = useState(false);
  const [active, setActive] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setOpen(true);
    queryThesaurusBK(subject, setResponse);
  };

  const handleSearchAdv = (e) => {
    e.preventDefault();
    //console.log(subject);
    queryThesaurusBK(subject, setResponse);
  };

  const handleCollection = (collection) => {
    console.log(collection);
  };

  const handleChoose = () => {
    setChoise(subjectBK.authority);
    setSubject("");
    setOpen(false);
    setActive(true);
  };

  const handleRecuse = () => {
    setChoise(false);
    setActive(false);
  };

  const inputPros = {
    startAdornment: choise && (
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
            {subjectBK.authority}
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
            onClick={handleRecuse}
          />
        </Typography>
      </InputAdornment>
    ),
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
          disabled={active}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          value={subject}
          fullWidth
          label="Assunto"
          InputProps={inputPros}
        />
      </form>

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
            <Grid item xs={5} sx={{ pr: "0.5rem", borderRight: "solid 1px" }}>
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
                            //console.log(subject.uri)
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
                  <i>Nenhum registro encontrado:</i>
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
            <Grid item xs={7}>
              {subjectBK && (
                <>
                  <Card sx={{ minWidth: 350, width: "100%" }}>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h6">
                          {subjectBK.authority}
                        </Typography>
                        {subjectBK.thesarus == "BKSH" ? (
                          <Tooltip title="Escolher">
                            <IconButton
                              color="primary"
                              component="label"
                              onClick={handleChoose}
                            >
                              <FileDownloadDone />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Traduzir">
                            <IconButton
                              color="primary"
                              component="label"
                              onClick={() => {
                                setOpenTranslate(true);
                              }}
                            >
                              <TranslateIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                      <Divider />
                      {/* variant */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {subjectBK.variant.length > 0 && (
                          <Box
                            sx={{
                              ...styleIformation,
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="subtitle2">
                              Variantes:
                            </Typography>
                            <List dense={true}>
                              {subjectBK.variant.map((variant, index) => (
                                <ListItem key={index}>
                                  <ListItemText primary={variant} />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        {/* reciprocalAuthority */}
                        {subjectBK?.reciprocalAuthority && (
                          <Box
                            sx={{
                              ...styleIformation,
                              flexDirection: "column",
                            }}
                          >
                            <Typography variant="subtitle2">
                              Termo Relacionado:
                            </Typography>
                            <List dense={true}>
                              {subjectBK.reciprocalAuthority.map(
                                (reciprocalAuthority, index) => (
                                  <ListItem key={index}>
                                    <Badge
                                      badgeContent={
                                        reciprocalAuthority.collection
                                      }
                                      color="secondary"
                                    >
                                      <Button
                                        variant="outlined"
                                        sx={{ textTransform: "none" }}
                                        onClick={() => {
                                          let token =
                                            reciprocalAuthority.uri.split(
                                              "/"
                                            )[5];
                                          console.log(token);
                                          ParserLCSH(token, setSubjectBK);
                                        }}
                                      >
                                        {reciprocalAuthority.label}
                                      </Button>
                                    </Badge>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Box>
                        )}
                      </Box>
                      {/* narrower */}
                      {subjectBK?.narrower && (
                        <Box
                          sx={{ ...styleIformation, flexDirection: "column" }}
                        >
                          <Typography variant="subtitle2">
                            Termos Restritos:
                          </Typography>
                          <List dense={true}>
                            {subjectBK.narrower.map((narrower, index) => (
                              <ListItem key={index} sx={{ pb: "1rem" }}>
                                {/* <ListItemButton> */}
                                <Badge
                                  badgeContent={narrower.collection}
                                  color="secondary"
                                >
                                  <Button
                                    sx={{
                                      textTransform: "none", //pb: "0.5rem"
                                    }}
                                    variant="outlined"
                                    onClick={() => {
                                      let token = narrower.uri.split("/")[5];
                                      //console.log(token);
                                      ParserLCSH(token, setSubjectBK);
                                    }}
                                  >
                                    {narrower.label}
                                  </Button>
                                </Badge>
                                {/* </ListItemButton> */}
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <ThesaurusLCSH
        open={openLCSH}
        setOpen={setOpenLCSH}
        setOpenBK={setOpen}
        setSubjectBK={setSubjectBK}
      />
      <Translate
        open={openTranslate}
        setOpen={setOpenTranslate}
        subjectDetails={subjectBK}
        setOpenLCSH={setOpen}
        setOpenBK={setOpen}
        setSubjectBK={setSubjectBK}
      />
    </Box>
  );
}
