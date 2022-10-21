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

export default function TranslateField({ translate, subject, label }) {

    const styleIcon = {
        fontSize: "25px",
        px: "5px",
        color: blue[800],
        cursor: "pointer",
      };

  const inputPros = {
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
              {translate}
            </Typography>
          </Box>
          <Tooltip title="Aceitar">
            <FileDownloadDone
              sx={{
                ...styleIcon,
                backgroundColor: green[400],
              }}
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
            />
          </Tooltip>
        </Box>
      </InputAdornment>
    ),
  };
  return (
    <TextField
      defaultValue={subject}
      fullWidth
      label={label}
      InputProps={inputPros}
    />
  );
}
