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
  InputAdornment,
  TextareaAutosize,
  alertTitleClasses,
} from "@mui/material";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import MakeTranslate from "./makeTranslate";
import { useEffect, useState } from "react";
import { api } from "src/services/translate/api";

export default function Translate({ open, setOpen, subjectDetails }) {
  const [translate, setTranslate] = useState({});

  //   const [translateNote, setTranslate] = useState(null);

  function getTranslate(termo) {
    api
      .post(`/${termo}`)
      .then((response) => {
        setTranslate((prevState) => ({
          ...prevState,
          note: response.data.translate,
        }));
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  useEffect(() => {
    getTranslate(subjectDetails?.note);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAceptAll = () => {
    //setObjOriginal(objTranslate)
  };

  const handleSalve = () => {
    //setObjOriginal(objTranslate)
    alert(JSON.stringify(translate));
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
      <DialogContent>
        {/* <Box sx={{display: "flex", justifyContent: "space-between"}}> */}
        <Grid container>
          <Grid
            item
            xs={6} //sx={{ borderRight: "solid 1px" }}
          >
            <MakeTranslate
              termo={subjectDetails?.authority}
              metadata={"authority"}
              setTranslate={setTranslate}
              translate={translate}
              subjectDetails={subjectDetails}
              label={"Assunto"}
            />
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
              aria-label="note"
              minRows={3}
              placeholder={translate.note}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>

        {/* </Box> */}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleAceptAll}>Aceitar Todos</Button>
        <Button onClick={handleSalve}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
