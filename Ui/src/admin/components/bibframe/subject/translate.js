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
} from "@mui/material";

import { useState, useEffect } from "react";
import { api } from "src/services/translate/api"; 
import { apiSubject } from "src/services/thesaurus/creater"; 
import { blue, red, green } from "@mui/material/colors/";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import TranslateField from "./translateField";
//import { useForm, Controller } from "react-hook-form";

export default function TranslateSubject({
  open,
  setOpen,
  subjectDetails,
  setSubjectDetails,
  tokenLSCH,
  uris
}) {
  const [objTranslate, setObjectTranslate] = useState({});
  const [objOriginal, setObjOriginal] = useState({});
  function getTranslate(termo, metadata) {
    //console.log('T', termo)
    api
      .post(`/${termo}`)
      .then((response) => {
        //console.log("Translate", response.data.translate);
        setObjectTranslate((prevState) => ({
          ...prevState,
          [`${metadata}`]: response.data.translate,
        }));
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  useEffect(() => {
    const arr = Object.entries(subjectDetails);
    const objOriginal = {};
  
    arr.forEach(([k, v]) => {
      if (!Array.isArray(v)) {
        objOriginal[`${k}`] = v;
        getTranslate(v, k);
      } else {
        v.forEach((termo, index) => {
          let metadata = `${k}_${index}`;
          objOriginal[`${metadata}`] = termo;
          getTranslate(termo, metadata);
        });
      }
    });

    setObjOriginal(objOriginal);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const styleIcon = {
    fontSize: "25px",
    px: "5px",
    color: blue[800],
    cursor: "pointer",
  };

  const handleAceptAll = () => {
 
    //alert(JSON.stringify(objTranslate));
    setObjOriginal(objTranslate)
  };

  const handleSalve = () => {
    const objParse = { tokenLSCH: tokenLSCH }
    objParse['authority'] = objOriginal.authority
    objParse['variant'] = objOriginal.variant
    objParse['reciprocalAuthority'] = {
      value: objOriginal.reciprocalAuthority,
      uri: uris.reciprocalAuthority}
    const arr = Object.entries(objOriginal);
    const narrowerAuthority = []
    arr.forEach(([k, v]) => {
      if (k.includes('narrowerAuthority')) {
        narrowerAuthority.push(v)
      }      
    })
    //objParse['narrowerAuthority'] = narrowerAuthority
    const narrower = []
    narrowerAuthority.forEach((v, i) => {
      narrower.push({
        value: v,
        uri: uris.narrowerUris[i]
      })
    })
    objParse['narrowerAuthority'] = narrower

    apiSubject.post('subject', objParse)
    .then((response) => {
      console.log('r', response)
    })
    .catch(function (error) {
      console.log("ERROOO!!", error);
    });

    //console.log(objParse)
    
   
  }

  const formSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    let formObject = Object.fromEntries(data.entries());
    console.log(formObject);
  }

  return (
    <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="div">Traduzir Termo</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
      <form onSubmit={formSubmit}>
        <DialogContent>
          <TranslateField
            translate={objTranslate}
            subject={subjectDetails.label}
            label={"authoritativeLabel"}
            metadata={"authority"}
            setObjectTranslate={setObjectTranslate}
            objOriginal={objOriginal}
            setObjOriginal={setObjOriginal}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              my: "1rem",
              gap: "0.5rem",
            }}
          >
            {/* variant */}
            <TranslateField
              translate={objTranslate}
              subject={subjectDetails.variant}
              label={"Variante"}
              //control={control}
              //reset={reset}
              metadata={"variant"}
              objOriginal={objOriginal}
              setObjOriginal={setObjOriginal}
            />

            {/* Termo Relacionado */}
            <TranslateField
              translate={objTranslate}
              subject={subjectDetails.reciprocalAuthority}
              setSubjectDetails={setSubjectDetails}
              label={"Termo Relacionado"}
              setObjectTranslate={setObjectTranslate}
              metadata={"reciprocalAuthority"}
              //control={control}
              //reset={reset}
              objOriginal={objOriginal}
              setObjOriginal={setObjOriginal}
            />
          </Box>
          <Grid container>
            {subjectDetails?.narrowerAuthority?.length !== 0 && (
              <Grid item xs={6} sx={{ borderRight: "solid 1px", p: "0.5rem" }}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Termos Restritos
                  </Typography>
                  <Stack spacing={2}>
                    {subjectDetails?.narrowerAuthority.map(
                      (narrowerAuthority, index) => (
                        <TranslateField
                          key={index}
                          translate={objTranslate}
                          subject={narrowerAuthority}
                          label={"Termo Restrito"}
                          metadata={`narrowerAuthority_${index}`}
                          objOriginal={objOriginal}
                          setObjOriginal={setObjOriginal}
                        />
                      )
                    )}
                  </Stack>
                </Box>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
        <Button onClick={handleAceptAll}>Aceitar Todos</Button>
          <Button 
          //type="submit"
          onClick={handleSalve}
          >Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
