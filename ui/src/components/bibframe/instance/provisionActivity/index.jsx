// MUI
import { Box, Typography, TextField } from "@mui/material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function ProvisionActivity() {

  const { instance, setInstances } = useBf();

  const handlePlace = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      place: e.target.value,
    }));
  };

  const handlePublication = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      publication: e.target.value,
    }));
  };

  const handleDate = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      date: e.target.value,
    }));
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Publicação
      </Typography>
      <Box
        sx={{
          px: "2rem",
          pb: "2rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <TextField
          onChange={handlePlace}
          value={instance.place}
          fullWidth
          label="Local"
        />
        <TextField
          onChange={handlePublication}
          value={instance.publication}
          fullWidth
          label="Editora"
        />
        <TextField
          onChange={handleDate}
          value={instance.date}
          fullWidth
          label="Ano"
        />
      </Box>
    </Box>
  );
}
