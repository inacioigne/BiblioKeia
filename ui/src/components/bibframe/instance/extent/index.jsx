// MUI
import { Box, Typography, TextField } from "@mui/material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Extent() {

    const { instance, setInstances } = useBf();

    const handleExtent = (e) => {
        setInstances((prevState) => ({
          ...prevState,
          extent: e.target.value,
        }));
      };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Extensão
      </Typography>
      <Box
        sx={{
          px: "2rem",
          pb: "2rem"
        }}
      >
        <TextField
          onChange={handleExtent}
          value={instance.extent}
          fullWidth
          label="Extensão"
        />
      </Box>
    </Box>
  );
}
