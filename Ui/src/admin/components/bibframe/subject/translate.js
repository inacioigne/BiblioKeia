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
import { blue, red, green } from "@mui/material/colors/";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
<<<<<<< HEAD
import TranslateField from "./translateField";
//import { useForm, Controller } from "react-hook-form";

export default function TranslateSubject({
  open,
  setOpen,
  subjectDetails,
  setSubjectDetails,
}) {
  const [objectTranslate, setObjectTranslate] = useState({});
  const [objOriginal, setObjOriginal] = useState({});
=======
import TranslateField from "./translateSubject";
import { useForm, Controller } from "react-hook-form";

export default function TranslateSubject({ open, setOpen, subjectDetails, setSubjectDetails }) {
  const [objectTranslate, setObjectTranslate] = useState({});

  useEffect(() => {
    const arr = Object.entries(subjectDetails);
    console.log(Object.entries(subjectDetails))
    arr.forEach(([k, v]) => {
      if (!Array.isArray(v)) {
        getTranslate(v, k);
      } else {
        v.forEach((termo, index) => {
          let metadata = `${k}_${index}`;
          getTranslate(termo, metadata);
        });
      }
    });
    console.log(objectTranslate);
  }, []);

>>>>>>> 52c596276c4c77b53ee9ca1be805a83fc233b8c7
  function getTranslate(termo, metadata) {
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

<<<<<<< HEAD
  useEffect(() => {
    const arr = Object.entries(subjectDetails);
    const objOriginal = {};
    //console.log(Object.entries(subjectDetails))
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
    //console.log('Obj', objOriginal);
    setObjOriginal(objOriginal);
  }, []);

=======
>>>>>>> 52c596276c4c77b53ee9ca1be805a83fc233b8c7
  const handleClose = () => {
    setOpen(false);
  };

  const styleIcon = {
    fontSize: "25px",
    px: "5px",
    color: blue[800],
    cursor: "pointer",
  };

  const handleSalve = () => {
<<<<<<< HEAD
    console.log(objectTranslate);
    alert(JSON.stringify(objOriginal));
  };
=======
    console.log(objectTranslate)
    alert(JSON.stringify(objectTranslate))
  }
>>>>>>> 52c596276c4c77b53ee9ca1be805a83fc233b8c7

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const data = new FormData(e.target.va)
  //   console.log(data)
<<<<<<< HEAD

  // }

  // const { control, handleSubmit, reset } = useForm({
  //   defaultValues: objOriginal,
  // });

  //const onSubmit = (data) => console.log(data);
=======
    
  // }


  const { control, handleSubmit, reset } = useForm({});

  const onSubmit = data => console.log(data);
 
>>>>>>> 52c596276c4c77b53ee9ca1be805a83fc233b8c7

  return (
    <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={handleClose}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="div">Traduzir Termo</Typography>
        <IconButton color="primary" component="label" onClick={handleClose}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <Divider />
<<<<<<< HEAD
      <form //onSubmit={handleSubmit(onSubmit)}
      >
        <DialogContent>
          <TranslateField
            translate={objectTranslate}
            subject={subjectDetails.label}
            label={"authoritativeLabel"}
            metadata={"label"}
            //control={control}
            //reset={reset}
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
              translate={objectTranslate}
              subject={subjectDetails.variant}
              label={"Variante"}
              //metadata={"variant"}
              //control={control}
              //reset={reset}
              metadata={"variant"}
              objOriginal={objOriginal}
              setObjOriginal={setObjOriginal}
            />

            {/* Termo Relacionado */}
            <TranslateField
              translate={objectTranslate}
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
                          translate={objectTranslate}
                          subject={narrowerAuthority}
                          label={"Termo Restrito"}
                          metadata={`narrowerAuthority_${index}`}
                          //control={control}
                          //reset={reset}
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
        <DialogActions>
          <Button onClick={handleSalve}
            //type="submit"
          >
            Salvar
          </Button>
        </DialogActions>
=======
      <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
       
        <TranslateField
          translate={objectTranslate}
          subject={subjectDetails.label}
          label={"authoritativeLabel"}
          metadata={'label'}
          control={control}
          reset={reset}
          setObjectTranslate={setObjectTranslate}
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
            translate={objectTranslate}
            subject={subjectDetails.variant}
            label={"Variante"}
            metadata={'variant'}
            control={control}
            reset={reset}
          />

          {/* Termo Relacionado */}
          <TranslateField
            translate={objectTranslate}
            subject={subjectDetails.reciprocalAuthority}
            setSubjectDetails={setSubjectDetails}
            label={"Termo Relacionado"}
            setObjectTranslate={setObjectTranslate}
            metadata={'reciprocalAuthority'}
            control={control}
            reset={reset}

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
                        translate={
                          objectTranslate}
                        subject={narrowerAuthority}
                        label={"Termo Restrito"}
                        metadata={`narrowerAuthority_${index}`}
                        control={control}
                        reset={reset}
                      />
                    )
                  )}
                </Stack>
              </Box>

            </Grid>
          )}
        </Grid>
       
      </DialogContent>
      <DialogActions>
      <Button //onClick={handleSalve} 
      type="submit"
      >Salvar</Button>
      </DialogActions>
>>>>>>> 52c596276c4c77b53ee9ca1be805a83fc233b8c7
      </form>
    </Dialog>
  );
}
