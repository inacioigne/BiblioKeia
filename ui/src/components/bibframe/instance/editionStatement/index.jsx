// MUI
import { Box, Typography, TextField } from "@mui/material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Edition() {

    const { instance, setInstances } = useBf();

    const handleEdition = (e) => {
        setInstances((prevState) => ({
          ...prevState,
          edition: e.target.value,
        }));
      };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Edição
      </Typography>
      <Box
        sx={{
          px: "2rem",
          pb: "2rem"
        }}
      >
        <TextField
          onChange={handleEdition}
          value={instance.edition}
          fullWidth
          label="Edição"
        />
      </Box>
    </Box>
  );
}
