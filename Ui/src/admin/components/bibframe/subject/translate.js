import {
  Box,
  Typography,
  Divider,
  Dialog,
  IconButton,
  Tooltip,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  InputAdornment,
  Grid,
} from "@mui/material";

import { useState, useEffect } from "react";
import { api } from "src/services/translate/api";
import { blue, red, green } from "@mui/material/colors/";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import TranslateField from "./translateSubject";

export default function TranslateSubject({ open, setOpen, subjectDetails }) {
  const [objectTranslate, setObjectTranslate] = useState({
    //authoritativeLabel: "",
  });

  useEffect(() => {
    const arr = Object.entries(subjectDetails);
    //console.log(Object.entries(subjectDetails))
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

  const handleClose = () => {
    setOpen(false);
  };

  const styleIcon = {
    fontSize: "25px",
    px: "5px",
    color: blue[800],
    cursor: "pointer",
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
    
        <TranslateField
          translate={objectTranslate?.label}
          subject={subjectDetails.label}
          label={"authoritativeLabel"}
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
            translate={objectTranslate?.variant}
            subject={subjectDetails.variant}
            label={"Variante"}
          />

          {/* Termo Relacionado */}
          <TranslateField
            translate={objectTranslate?.reciprocalAuthority}
            subject={subjectDetails.reciprocalAuthority}
            label={"Termo Relacionado"}
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
                        translate={objectTranslate[`narrowerAuthority_${index}`]
                       // `${objectTranslate.narrowerAuthority}_${index}`
                      }
                        subject={narrowerAuthority}
                        label={"Termo Restrito"}
                      />
               
                    )
                  )}
                </Stack>
              </Box>
            </Grid>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
