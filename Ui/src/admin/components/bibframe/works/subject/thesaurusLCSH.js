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
  Pagination,
} from "@mui/material/";
import { Search, Clear, FileDownloadDone } from "@mui/icons-material/";
import TranslateIcon from "@mui/icons-material/Translate";
import { useState, useEffect } from "react";
import { api } from "src/services/loc";
import ParserLCSH from "src/services/thesaurus/parser_lcsh";
import Translate from "src/admin/components/bibframe/works/subject/translate";
import CardSubject from "src/admin/components/bibframe/works/subject/cardSubject";

// BiblioKeia Components
import CardThesaurus from "src/admin/components/thesaurus";
// import Narrower from "src/admin/components/thesaurus/narrower";
// import Broader from "src/admin/components/thesaurus/broader";

const styleIformation = {
  p: "0.5rem",
  display: "flex",
  gap: "0.5rem",
};

export default function ThesaurusLCSH({
  open,
  setOpen,
  setOpenBK,
  setSubjectBK,
}) {
  const [type, setType] = useState("all");
  const [collection, setCollection] = useState("LCSH_General");
  const [subject, setSubject] = useState("");
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [uris, setUris] = useState(null);
  const [openTranslate, setOpenTranslate] = useState(false);

  const getData = (
    subject = "",
    type = "",
    memberOf = "LCSH_General",
    page = 1
  ) => {
    let params = {
      q: `${subject}`,
      offset: page,
      rdftype: `${type}`,
      memberOf: `http://id.loc.gov/authorities/subjects/collection_${memberOf}`,
      //memberOf: "http://id.loc.gov/authorities/subjects/collection_Subdivisions"
    };

    api
      .get("authorities/subjects/suggest2/", {
        params: params,
      })
      .then((response) => {
        setHits(response.data.hits);
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setPage(1);
    getData(event.target.value, type, collection, 1);
    setSubject(event.target.value);
  };

  const handlePagination = (event, value) => {
    let p = value == 1 ? 1 : value * 10 - 9;
    console.log("p", p);
    setPage(value);
    getData(subject, type, collection, p);
  };

  useEffect(() => {
    //console.log(subjectDetails?.variant.length);

    getData();
  }, []);

  const getDetails = (token) => {
    ParserLCSH(token, setSubjectDetails, setUris);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getData(subject, type, collection);
  };

  const handleTranslate = () => {
    setOpenTranslate(true);
  };

  const inputPros = {
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
                  <Box sx={{ display: "flex", gap: "0.5rem" }}>
                    {/* Tipo */}
                    <FormControl fullWidth>
                      <InputLabel id="type">Tipo</InputLabel>
                      <Select
                        label="Tipo"
                        onChange={(event) => {
                          setType(event.target.value);
                        }}
                        value={type}
                      >
                        <MenuItem value={"all"}>Todos</MenuItem>
                        <MenuItem value={"Topic"}>Topic</MenuItem>
                        <MenuItem value={"SimpleType"}>Tipo Simples</MenuItem>
                        <MenuItem value={"ComplexType"}>Tipo Complexo</MenuItem>
                        <MenuItem value={"Geographic"}>Geographic</MenuItem>
                        <MenuItem value={"CorporateName"}>
                          Corporate Name
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {/* Collection */}
                    <FormControl fullWidth>
                      <InputLabel id="collection">Coleção</InputLabel>
                      <Select
                        label="Coleção"
                        onChange={(event) => {
                          setCollection(event.target.value);
                        }}
                        value={collection}
                      >
                        <MenuItem value={"LCSH_General"}>Geral</MenuItem>
                        <MenuItem value={"Subdivisions"}>
                          LCSH - Subdivisions
                        </MenuItem>
                        <MenuItem value={"GeographicSubdivisions"}>
                          LCSH - Geographic
                        </MenuItem>
                        <MenuItem value={"GenreFormSubdivisions"}>
                          LCSH - GenreForm
                        </MenuItem>
                        <MenuItem value={"Geographic"}>
                          LCSH - Temporal
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <TextField
                    onChange={handleChange}
                    value={subject}
                    fullWidth
                    label="Assunto"
                    InputProps={inputPros}
                  />
                </Box>
              </form>

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
                  {hits?.map((hit, index) => (
                    <ListItem key={index} disablePadding>
                      <Button
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                          let token = hit.uri.split("/")[5];
                          getDetails(token);
                        }}
                      >
                        {" "}
                        {hit.aLabel}
                      </Button>
                    </ListItem>
                  ))}
                </List>
                <Pagination
                  count={4}
                  page={page}
                  onChange={handlePagination}
                  color="primary"
                />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box
                sx={{ display: "flex", justifyContent: "center", pl: "2rem" }}
              >
                {subjectDetails && (
                  <>
                    <CardThesaurus
                      subjectDetails={subjectDetails}
                      setSubjectDetails={setSubjectDetails}
                      setOpenBK={setOpenBK}
                      setOpenTranslate={setOpenTranslate}
                    />
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      <Translate
        open={openTranslate}
        setOpen={setOpenTranslate}
        subjectDetails={subjectDetails}
        setOpenLCSH={setOpen}
        setOpenBK={setOpenBK}
        setSubjectBK={setSubjectBK}
      />
    </>
  );
}
