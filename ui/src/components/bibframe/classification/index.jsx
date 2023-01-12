import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuList,
  MenuItem,
  InputAdornment,
  IconButton,
  Grid,
} from "@mui/material/";
import { useState } from "react";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Classification() {
  const { work, setWork } = useBf();

  const handleOnChangeCdd = (str) => {
    setWork((prevState) => ({
      ...prevState,
      cdd: str,
    }));
  };

  const handleOnChangeCutter = (str) => {
    setWork((prevState) => ({
      ...prevState,
      cutter: str,
    }));
  };

  return (
    <Box >
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Classificação
      </Typography>
      <Box sx={{ px: "2rem", pb: "2rem", display: "flex", gap: "1rem"}}>
    
        <TextField
          name="cdd"
          fullWidth
          onChange={(e) => {
            handleOnChangeCdd(e.target.value);
          }}
          value={work.cdd}
          label="CDD"
        />
        <TextField
          name="cutter"
          fullWidth
          onChange={(e) => {
            handleOnChangeCutter(e.target.value);
          }}
          value={work.cutter}
          label="Cutter"
        />
      </Box>
    </Box>
  );
}
