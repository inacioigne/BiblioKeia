import {
  Box,
  Typography,
  InputAdornment,
  Tooltip,
  TextField,
} from "@mui/material";
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

export default function MakeTranslate({
  termo,
  setTranslate,
  translate,
  metadata,
  label,
  setSugestTranslate,
  sugestTranslate,
  uri
}) {
  const [sugest, setSugest] = useState(true);
  



  function getTranslate(termo) {
    api
      .post(`/${termo}`)
      .then((response) => {
        setSugestTranslate((prevState) => ({
          ...prevState,
          [`${metadata}`]: {value: response.data.translate, lang:"pt", uri: uri }
        }));
      })
      .catch(function (error) {
        console.log("ERROOO!!", error);
      });
  }

  useEffect(() => {
    setTranslate((prevState) => ({
      ...prevState,
      [`${metadata}`]: {value: termo, lang: "eng"}
    }));

    getTranslate(termo);
   
   
  }, []);

  const handleAgree = () => {
    // setTranslate((prevState) => ({
    //   ...prevState,
    //   [`${metadata}`]: sugestTranslate[`${metadata}`],
    // }));
    setTranslate((prevState) => ({
      ...prevState,
      [`${metadata}`]: sugestTranslate[`${metadata}`]
    }));
    setSugest(false);
  };

  const handleRecuse = () => {
    setSugest(false);
  };

  const handleChange = (e) => {
    setTranslate((prevState) => ({
      ...prevState,
      [`${metadata}`]: {value: e.target.value, lang: "pt"}
      
    }));
  };

  const inputProps = {
    startAdornment: sugest && (
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
              {sugestTranslate[`${metadata}`]?.value}
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
              onClick={handleRecuse}
            />
          </Tooltip>
        </Box>
      </InputAdornment>
    ),
  };
  if (translate[`${metadata}`]) {
    return (
      <>
     
      <TextField
        
        fullWidth
        disabled={sugest}
        id={metadata}
        name={metadata}
        label={label}
        value={translate[`${metadata}`]['value']}
        InputProps={inputProps}
        onChange={handleChange}
      />
     
       </>
    );
  } else {
    return <div>esperando...</div>;
  }
}