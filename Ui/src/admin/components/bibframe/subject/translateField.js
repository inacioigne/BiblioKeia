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
} from "@mui/material";
import { Search, Close, Clear, FileDownloadDone } from "@mui/icons-material";
import { blue, red, green } from "@mui/material/colors/";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const styleIcon = {
  fontSize: "25px",
  px: "5px",
  color: blue[800],
  cursor: "pointer",
};

export default function TranslateField({
  translate,
  subject,
  label,
  setObjectTranslate,
  subjectDetails,
  setSubjectDetails,
  metadata,
  control,
  reset,
  objOriginal,
  setObjOriginal,
}) {
  const [value, setValue] = useState(subject);
  const [disabled, setDisabled] = useState(true);

  const handleAgree = () => {
    console.log("TR", translate[`${metadata}`]);
    setDisabled(false);

    setObjOriginal((prevState) => ({
      ...prevState,
      [`${metadata}`]: translate[`${metadata}`],
    }));
  };
  const handleRecuse = () => {
    setDisabled(false);
  };

  const handleChange = (e) => {
    setObjOriginal((prevState) => ({
      ...prevState,
      [`${metadata}`]: e.target.value,
    }));
  };

  const inputPros = {
    startAdornment: disabled ? (
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
              onClick={handleRecuse}
            />
          </Tooltip>
        </Box>
      </InputAdornment>
    ) : null,
  };
  return (
    <TextField
      disabled={disabled}
      value={objOriginal[`${metadata}`]}
      fullWidth
      label={label}
      name={metadata}
      InputProps={inputPros}
      onChange={handleChange}
    />
  );
}
