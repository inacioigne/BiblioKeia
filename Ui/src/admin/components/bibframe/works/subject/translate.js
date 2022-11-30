import {
  Box,
  Typography,
  Divider,
  Dialog,
  IconButton,
  Tooltip,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  DialogActions,
  Grid,
  TextField,
  ListItem,
  TextareaAutosize,
  List,
} from "@mui/material";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import MakeTranslate from "./makeTranslate";
import { useEffect, useState, useRef } from "react";
//import { api } from "src/services/translate/api"; 
import { api } from "src/services/api"

export default function Translate({ open, setOpen, subjectDetails }) {
  const [translate, setTranslate] = useState({});
  const [sugestTranslate, setSugestTranslate] = useState({});
  const [agree, setAgree] = useState(false);
  const form = useRef(null);

  function getTranslate(termo) {
    api
      .post(`/translate/${termo}`)
      .then((response) => {
        setTranslate((prevState) => ({
          ...prevState,
          note: { value: response.data.translate, lang: "pt" },
        }));
        setSugestTranslate((prevState) => ({
          ...prevState,
          note: { value: response.data.translate, lang: "pt" },
        }));
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  useEffect(() => {
 
    if (subjectDetails?.note) {
      getTranslate(subjectDetails?.note);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAceptAll = () => {
    setTranslate(sugestTranslate);

    setAgree(true);
  };

  const checkTranslate = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleSalve = (e) => {
    e.preventDefault();
    const values = Object.values(translate);

    const langs = values.filter(function (item) {
      return item.lang == "eng";
    });
    if (langs.length > 0) {
      alert(JSON.stringify("Todos os termos precisam ser traduzidos"));
    } else {
      const entries = Object.entries(translate);

      const narrowers = new Array();
      const variants = new Array();
      let data = Object.assign({}, translate);
      entries.forEach(([k, v]) => {
        if (k.includes("narrower")) {
          narrowers.push(v);
          delete data[`${k}`];
        } else if (k.includes("variant")) {
          variants.push(v)
          delete data[`${k}`];
        }
      });

      data["narrower"] = narrowers;
      data["variant"] = variants
      data["exactExternalAuthority"] = subjectDetails.exactExternalAuthority;
      data["closeExternalAuthority"] = subjectDetails.closeExternalAuthority;
      data["tokenLSCH"] = subjectDetails.tokenLSCH

      api.post("/thesaurus/subject", data)
      .then((response) => {
        console.log('Sb:', response)
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });


      //console.log(data);
    }

    //alert(JSON.stringify(translate));
  };

  return (
    <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="div">Traduzir Termo</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form ref={form} onSubmit={handleSalve}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MakeTranslate
                termo={subjectDetails?.authority}
                metadata={"authority"}
                setTranslate={setTranslate}
                translate={translate}
                sugestTranslate={sugestTranslate}
                setSugestTranslate={setSugestTranslate}
                label={"Assunto"}
                agree={agree}
              />
            </Grid>

            <Grid item xs={6}>
              {/* Termo relacionado */}
              {subjectDetails?.reciprocalAuthority && (
                <MakeTranslate
                  termo={subjectDetails?.reciprocalAuthority.label}
                  uri={subjectDetails?.reciprocalAuthority.uri}
                  metadata={"reciprocalAuthority"}
                  setTranslate={setTranslate}
                  translate={translate}
                  sugestTranslate={sugestTranslate}
                  setSugestTranslate={setSugestTranslate}
                  label={"Termo relacionado"}
                  agree={agree}
                />
              )}
              {subjectDetails?.note && (
                <TextareaAutosize
                  aria-label="note"
                  minRows={3}
                  value={translate.note?.value}
                  onChange={(e) => {
                    setTranslate((prevState) => ({
                      ...prevState,
                      note: { value: e.target.value, lang: "pt" },
                    }));
                  }}
                  style={{ width: "100%" }}
                />
              )}
            </Grid>
            <Grid item xs={6}>
              {subjectDetails?.variant.length > 0 && (
                <Box pt={"0.5rem"}>
                  <Typography variant="subtitle2">Variantes:</Typography>
                  <List dense={true}>
                    {subjectDetails.variant.map((variant, index) => (
                      <ListItem key={index} sx={{ p: "0.5rem" }}>
                        <MakeTranslate
                          termo={variant}
                          //uri={narrower.uri}
                          metadata={`variant.${index}`}
                          setTranslate={setTranslate}
                          translate={translate}
                          sugestTranslate={sugestTranslate}
                          setSugestTranslate={setSugestTranslate}
                          label={"Variante"}
                          agree={agree}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>
            {/* Termos Restritos */}
            <Grid item xs={6}>
              {subjectDetails?.narrower && (
                <Box pt={"0.5rem"}>
                  <Typography variant="subtitle2">Termos Restritos:</Typography>
                  <List dense={true}>
                    {subjectDetails.narrower.map((narrower, index) => (
                      <ListItem key={index} sx={{ p: "0.5rem" }}>
                        <MakeTranslate
                          termo={narrower.label}
                          uri={narrower.uri}
                          metadata={`narrower.${index}`}
                          setTranslate={setTranslate}
                          translate={translate}
                          sugestTranslate={sugestTranslate}
                          //subjectDetails={subjectDetails}
                          setSugestTranslate={setSugestTranslate}
                          label={"Termo restrito"}
                          agree={agree}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleAceptAll}>Aceitar Todos</Button>
          <Button //onClick={handleSalve}
            type="submit"
          >
            Salvar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
