import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuList,
  MenuItem,
  InputAdornment,
  IconButton,
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
    <Box p={"2rem"}>
      <Typography variant="subtitle2">Classificação</Typography>
      <Paper sx={{ p: "1rem", width: "30rem", display: "flex", gap: "0.5rem" }}>
        <TextField
          name="cdd"
          onChange={(e) => {
            handleOnChangeCdd(e.target.value);
          }}
          value={work.cdd}
          label="CDD"
        />
        <TextField
          name="cutter"
          onChange={(e) => {
            handleOnChangeCutter(e.target.value);
          }}
          value={work.cutter}
          label="Cutter"
        />
      </Paper>
    </Box>
  );
}
