import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  // MenuItem,
  // FormControl,
  // InputLabel,
  // Select,
} from "@mui/material/";
import { Search, Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors/";

export default function SearchSubject({
  setSubject,
  subject,
  disabled,
  setDisabled,
  handleSearch,
  name,
  setName,
}) {
  const inputPros = {
    disabled: disabled,
    startAdornment:
      name !== "" ? (
        <InputAdornment position="start">
          <Typography
            variant="subtitle2"
            gutterBottom
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
              {name}
            </Box>

            <Close
              sx={{
                fontSize: "25px",
                px: "5px",
                color: blue[800],
                backgroundColor: red[200],
                cursor: "pointer",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
              onClick={() => {
                setDisabled(false);
                setName("");
              }}
            />
          </Typography>
        </InputAdornment>
      ) : null,
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          component="button"
          onClick={handleSearch}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  return (
    <TextField
      onChange={(e) => {
        setSubject(e.target.value);
      }}
      value={subject}
      fullWidth
      label="Assunto"
      InputProps={inputPros}
    />
  );
}
