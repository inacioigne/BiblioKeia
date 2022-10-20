import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material/";
//import { useState } from "react";
import { Search, Close } from "@mui/icons-material";

export default function SearchSubject({
  setSubject,
  subject,
  disabled,
  handleSearch,
}) {
  const inputPros = {
    disabled: disabled,
    startAdornment: disabled ? (
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
            {value}
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
          type="submit"
          onSubmit={handleSearch}
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
