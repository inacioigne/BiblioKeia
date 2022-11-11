import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState } from "react";
// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Title() {
  const { instance, setInstances } = useBf();

  const [type, setType] = useState("Title");

  const handleOnChangeMainTitle = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      mainTitle: e.target.value,
    }));
  };
  return (
    <Box bgcolor={grey[100]} p={"2rem"}>
      <Typography variant="subtitle2">Title</Typography>
      <Paper sx={{ p: "1rem", width: "30rem" }}>
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
            onChange={handleOnChangeMainTitle}
            //defaultValue="mainTitle"
            value={instance.mainTitle}
            fullWidth
            label="Titulo principal"
          />
        </Box>
      </Paper>
    </Box>
  );
}
