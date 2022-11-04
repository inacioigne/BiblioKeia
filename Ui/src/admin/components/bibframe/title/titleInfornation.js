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

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe"

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

export default function TitleInformation( 
  //{ values, setValues } 
  ) {

  const { bf, setBf } = useBf()
  const [type, setType] = useState("Title");
  //const [mainTitle, setMainTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleOnChangeMainTitle = (e) => {
    setBf((prevState) => ({
      ...prevState,
      mainTitle: e.target.value,
    }));
  };
  const handleChangeSubtitle = (e) => {
    setBf((prevState) => ({
      ...prevState,
      subtitle: e.target.value,
    }));
  };

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
        // onChange={(e) => {
        //   setMainTitle(e.target.value);
          
        // }}
        onChange={handleOnChangeMainTitle}
        //value={mainTitle}
        value={bf.mainTitle}
        fullWidth
        label="Titulo principal"
        InputProps={inputPros}
      />

      <TextField
        onChange={handleChangeSubtitle}
        //value={subtitle}
        value={bf.subtitle}
        fullWidth
        label="Subtítulo"
        InputProps={inputPros}
      />
    </Box>
  );
}
