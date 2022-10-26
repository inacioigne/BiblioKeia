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
import { useState } from "react";
import { Search, Close } from "@mui/icons-material";

const inputPros = {
  endAdornment: (
    <InputAdornment position="end">
      <IconButton
        color="primary"
        aria-label="search"
        component="button"
        type="submit"
        //onSubmit={handleSearch}
      >
        <Search />
      </IconButton>
    </InputAdornment>
  ),
};

export default function TitleInformation() {
  const [type, setType] = useState("Title");
  const [mainTitle, setMainTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="type">Tipo</InputLabel>
        <Select
          label="Tipo"
          onChange={(event) => {
            setType(event.target.value);
          }}
          value={type}
        >
          <MenuItem value={"Title"}>Título</MenuItem>
          <MenuItem value={"VariantTitle"}>Título Alternativo</MenuItem>
        </Select>
      </FormControl>

      <TextField
        onChange={(e) => {
          setMainTitle(e.target.value);
        }}
        value={mainTitle}
        fullWidth
        label="Titulo principal"
        InputProps={inputPros}
      />

      <TextField
        onChange={(e) => {
          setSubtitle(e.target.value);
        }}
        value={subtitle}
        fullWidth
        label="Subtítulo"
        InputProps={inputPros}
      />
    </Box>
  );
}
