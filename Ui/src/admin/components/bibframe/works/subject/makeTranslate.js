import { Box, Typography, InputAdornment, Tooltip, TextField } from "@mui/material";
import { blue, red, green } from "@mui/material/colors/";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import { api } from "src/services/translate/api";
import { useEffect, useState } from "react";

const styleIcon = {
  fontSize: "25px",
  px: "5px",
  color: blue[800],
  cursor: "pointer",
};

export default function MakeTranslate({ subjectDetails, termo, setTranslate, translate, metadata, label}) {
  const [value, setValue] = useState("");

  function getTranslate(termo) {
    api
      .post(`/${termo}`)
      .then((response) => {
        
        setTranslate((prevState) => ({
          ...prevState,
          [`${metadata}`]: response.data.translate,
        }));
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  useEffect(() => {
    setValue(subjectDetails?.authority)
    getTranslate(termo);
  }, []);

  const handleAgree = () => {
    //setObjOriginal(objTranslate)
    //
    setValue(translate[`${metadata}`])
    console.log(translate[`${metadata}`])
  };

  const inputProps = {
    startAdornment: (
      <InputAdornment position="start">
      <Box
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
          <Typography variant="subtitle2" p={0}>
            {translate[`${metadata}`]}
          </Typography>
        </Box>
        <Tooltip title="Aceitar">
          <FileDownloadDone
            sx={{
              ...styleIcon,
              backgroundColor: green[400],
            }}
            onClick={handleAgree}
          />
        </Tooltip>
        <Tooltip title="Recusar">
          <Close
            sx={{
              ...styleIcon,
              backgroundColor: red[200],
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
            //onClick={handleRecuse}
          />
        </Tooltip>
      </Box>
    </InputAdornment>

    )

  }
    // startAdornment: (
    //   <MakeTranslate
    //     termo={subjectDetails?.authority}
    //     metadata={"authority"}
    //     setTranslate={setTranslate}
    //     translate={translate}
    //   />

  return (
    
    
    <TextField
    label={label}
    //defaultValue={agree ? (subjectDetails[`${metadata}`]) : 'HHEHEH'}
    value={value}
    InputProps={inputProps}

  />

  );
}
