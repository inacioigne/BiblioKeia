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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  ListItemText,
} from "@mui/material/";
import { Search, Clear, FileDownloadDone } from "@mui/icons-material/";
import TranslateIcon from "@mui/icons-material/Translate";
import { useState } from "react";
import { api } from "src/services/loc";
import ParserLCSH from "src/services/thesaurus/parser_lcsh";
import Translate from "src/admin/components/bibframe/works/subject/translate";

const styleIformation = {
  p: "0.5rem",
  display: "flex",
  gap: "0.5rem",
};

export default function ThesaurusLCSH({ open, setOpen }) {
  const [type, setType] = useState("SimpleType");
  const [subject, setSubject] = useState("");
  const [hits, setHits] = useState([]);
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [uris, setUris] = useState(null);
  const [openTranslate, setOpenTranslate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getData = (subject, type) => {
    api
      .get("authorities/subjects/suggest2/", {
        params: {
          q: `${subject}`,
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

  const getDetails = (token) => {
    //setToken(token)
    ParserLCSH(token, setSubjectDetails, setUris);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData(subject, type);
  };

  const handleTranslate = () => {
    setOpenTranslate(true);
    // SetListSubject((prevState) => [
    //   ...prevState,
    //   {
    //     label: subjectDetails?.authority,
    //     lang: 'en',
    //     type: type,
    //     schema: "http://id.loc.gov/authorities/subjects",
    //   },
    // ]);
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

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="div">Thesaurus LCSH</Typography>
          <IconButton color="primary" component="label" onClick={handleClose}>
            <Clear />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item xs={5} sx={{ borderRight: "solid 1px" }}>
              <form onSubmit={handleSearch}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    p: "1rem",
                  }}
                >
                  <FormControl>
                    <InputLabel id="type">Tipo</InputLabel>
                    <Select
                      label="Tipo"
                      onChange={(event) => {
                        setType(event.target.value);
                      }}
                      value={type}
                    >
                      <MenuItem value={"SimpleType"}>Tipo Simples</MenuItem>
                      <MenuItem value={"ComplexType"}>Tipo Complexo</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    onChange={(e) => {
                      setSubject(e.target.value);
                    }}
                    value={subject}
                    fullWidth
                    label="Assunto"
                    InputProps={inputPros}
                  />
                </Box>
              </form>
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
                {hits?.map((hit, index) => (
                  <ListItem key={index} disablePadding>
                    <Button
                      sx={{ textTransform: "none" }}
                      onClick={() => {
                        let token = hit.uri.split("/")[5];
                        //console.log(token);
                        getDetails(token);
                      }}
                    >
                      {" "}
                      {hit.aLabel}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={7}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {subjectDetails && (
                  <>
                    <Card sx={{ minWidth: 350, width: 450 }}>
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">
                            {subjectDetails?.authority}
                          </Typography>

                          <Tooltip title="Traduzir">
                            <IconButton
                              color="primary"
                              component="label"
                              onClick={handleTranslate}
                            >
                              <TranslateIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Divider />
                        <Typography
                          pt={"10px"}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {subjectDetails?.note}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          {/* Variantes */}
                          {subjectDetails?.variant.length > 0 && (
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
                                {subjectDetails.variant.map(
                                  (variant, index) => (
                                    <ListItem key={index}>
                                      <ListItemText primary={variant} />
                                    </ListItem>
                                  )
                                )}
                              </List>
                            </Box>
                          )}
                          {/* Termo Relacionado */}
                          {subjectDetails?.reciprocalAuthority && (
                            <Box
                              sx={{
                                ...styleIformation,
                                flexDirection: "column",
                              }}
                            >
                              <Typography variant="subtitle2">
                                Termo Relacionado:
                              </Typography>
                              <Typography variant="body1">
                                <Button
                                  sx={{ textTransform: "none" }}
                                  onClick={() => {
                                    let token =
                                      uris.reciprocalAuthority.split("/")[5];
                                    //console.log(token);
                                    getDetails(token);
                                  }}
                                >
                                  {subjectDetails.reciprocalAuthority}
                                </Button>
                              </Typography>
                            </Box>
                          )}
                        </Box>

                        {/* narrowerAuthorit */}
                        {subjectDetails?.narrower && (
                          <Box
                            sx={{ ...styleIformation, flexDirection: "column" }}
                          >
                            <Typography variant="subtitle2">
                              Termos Restritos:
                            </Typography>
                            <List dense={true}>
                              {subjectDetails.narrower.map(
                                (narrower, index) => (
                                  <ListItem key={index}>
                                  
                                    <Typography variant="body1">
                                      <Button
                                        sx={{ textTransform: "none" }}
                                        onClick={() => {
                                          let token =
                                            narrower.uri.split("/")[5];
                                          getDetails(token);
                                        }}
                                      >
                                        {narrower.label}
                                      </Button>
                                    </Typography>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </Box>
                        )}
                        {/* <code>{subjectDetails?.variant}</code> */}
                      </CardContent>
                    </Card>

                    <Translate
                      open={openTranslate}
                      setOpen={setOpenTranslate}
                      subjectDetails={subjectDetails}
                    />
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
