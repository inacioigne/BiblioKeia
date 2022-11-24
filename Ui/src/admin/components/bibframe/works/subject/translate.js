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
import { useEffect, useState } from "react";
import { api } from "src/services/translate/api";

export default function Translate({ open, setOpen, subjectDetails }) {
  const [translate, setTranslate] = useState({});
  const [sugestTranslate, setSugestTranslate] = useState({});

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
    console.log(subjectDetails.narrower);
    getTranslate(subjectDetails?.note);
    setTranslate((prevState) => ({
      ...prevState,
      note: sugestTranslate.note,
    }));
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAceptAll = () => {
    //setObjOriginal(objTranslate)
  };

  const handleSalve = () => {

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
        <Grid container>
          <Grid
            item
            xs={6} //sx={{ borderRight: "solid 1px" }}
          >
            {/* <MakeTranslate
              termo={subjectDetails?.authority}
              metadata={"authority"}
              setTranslate={setTranslate}
              translate={translate}
              sugestTranslate={sugestTranslate}
              //subjectDetails={subjectDetails}
              setSugestTranslate={setSugestTranslate}
              label={"Assunto"}
            /> */}
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
              aria-label="note"
              minRows={3}
              value={translate.note}
              onChange={(e) => {
                setTranslate((prevState) => ({
                  ...prevState,
                  note: e.target.value,
                }));
              }}
              style={{ width: "100%" }}
            />
          </Grid>
        </Grid>
        {/* Termos Restritos */}
        {subjectDetails?.narrower && (
          <Box pt={"0.5rem"}>
            <Typography variant="subtitle2">Termos Restritos:</Typography>
            <List dense={true}>
              {subjectDetails.narrower.map((narrower, index) => (
                <ListItem key={index}>
                  <MakeTranslate
                    termo={narrower.label}
                    metadata={"narrower"}
                    setTranslate={setTranslate}
                    translate={translate}
                    sugestTranslate={sugestTranslate}
                    //subjectDetails={subjectDetails}
                    setSugestTranslate={setSugestTranslate}
                    label={"Termo restrito"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={handleAceptAll}>Aceitar Todos</Button>
        <Button onClick={handleSalve}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
