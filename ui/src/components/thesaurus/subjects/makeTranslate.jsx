import {
  Box,
  Typography,
  InputAdornment,
  Tooltip,
  TextField,
  LinearProgress,
} from "@mui/material";
import { blue, red, green } from "@mui/material/colors/";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import { api } from "src/services/api/api";
import { useEffect, useState } from "react";

const styleIcon = {
  fontSize: "25px",
  px: "5px",
  color: blue[800],
  cursor: "pointer",
};

export default function MakeTranslate({
  termo,
  type,
  setTranslate,
  translate,
  metadata,
  label,
  setSugestTranslate,
  sugestTranslate,
  uri,
}) {
  const [sugest, setSugest] = useState(true);

  async function getTranslate(termo) {
    if (type == "ComplexSubject") {
      let ComplexSubject = termo.split("--");

      let cs1 = await api
        .post(`/translate/${ComplexSubject[0]}`)
        .then((response) => {
          return response.data.translate;
        });

      let cs2 = await api
        .post(`/translate/${ComplexSubject[1]}`)
        .then((response) => {
          return response.data.translate;
        });

      //console.log("Trans", `${cs1}--${cs2}`);
      setSugestTranslate((prevState) => ({
        ...prevState,
        [`${metadata}`]: {
          value: `${cs1}--${cs2}`,
          lang: "pt",
          uri: uri,
          type: type,
        },
      }));
    } else {
      api
        .post(`/translate/${termo}`)
        .then((response) => {
          setSugestTranslate((prevState) => ({
            ...prevState,
            [`${metadata}`]: {
              value: response.data.translate,
              lang: "pt",
              uri: uri,
              type: type,
            },
          }));
        })
        .catch(function (error) {
          console.log("ERROOO!!", error);
        });
    }
  }

  useEffect(() => {
    setTranslate((prevState) => ({
      ...prevState,
      [`${metadata}`]: { value: termo, lang: "eng" },
    }));

    getTranslate(termo);
  }, []);

  const handleAgree = () => {
    setTranslate((prevState) => ({
      ...prevState,
      [`${metadata}`]: sugestTranslate[`${metadata}`],
    }));
    setSugest(false);
  };

  const handleRecuse = () => {
    setSugest(false);
    setTranslate((prevState) => ({
      ...prevState,
      [`${metadata}`]: { value: termo, lang: "eng" },
    }));
  };

  const handleChange = (e) => {
    setTranslate((prevState) => ({
      ...prevState,
      [`${metadata}`]: {
        value: e.target.value,
        lang: "pt",
        uri: sugestTranslate[`${metadata}`].uri,
        type: type,
      },
    }));
  };

  const inputProps = {
    startAdornment: sugest && (
      <InputAdornment position="start">
        {sugestTranslate[`${metadata}`]?.value ? (
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
        ) : (
          <Box
            sx={{
              borderRight: "solid 1px",
              borderRadius: "5px",
              //borderBottomLeftRadius: "5px",
              px: "5px",
              pt: "2px",
              backgroundColor: red[300],
            }}
          >
            <Typography variant="subtitle2" p={0}>
              Traduzindo termo...
            </Typography>
            <LinearProgress color="secondary" />
          </Box>
        )}
      </InputAdornment>
    ),
  };

  if (translate[`${metadata}`]) {
    return (
      <TextField
        fullWidth
        disabled={sugest}
        id={metadata}
        name={metadata}
        label={label}
        value={translate[`${metadata}`]["value"]}
        InputProps={inputProps}
        onChange={handleChange}
      />
    );
  } else {
    return null;
  }
}
