// MUI
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material/";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Type() {

  const [type, setType] = useState("Print");

  const { instance, setInstances } = useBf();

  // useEffect(() => {
    
  //   setInstances((prevState) => ({
  //     ...prevState,
  //     type: "Print",
  //   }));

  // })


  const handleType = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      type: e.target.value,
    }));
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Tipo
      </Typography>
      <Box sx={{ px: "2rem", pb: "2rem" }}>
        <FormControl fullWidth>
          <InputLabel id="type">Tipo</InputLabel>
          <Select
            label="Tipo"
            onChange={handleType}
            value={instance.type}
          >
            <MenuItem value={"Print"}>Impresso</MenuItem>
            <MenuItem value={"Archival"}>Arquivamento controlado</MenuItem>
            <MenuItem value={"Tactile"}>Material tátil</MenuItem>
            <MenuItem value={"Electronic"}>Eletrônico</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
