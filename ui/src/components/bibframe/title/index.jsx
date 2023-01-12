// MUI
import { Box, Typography, TextField } from "@mui/material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Title() {
  const { work, setWork } = useBf();

  const handleTitle = (e) => {
    setWork((prevState) => ({
      ...prevState,
      mainTitle: e.target.value,
    }));
  };

  const handleSubtitle = (e) => {
    setWork((prevState) => ({
      ...prevState,
      subtitle: e.target.value,
    }));
  };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Informação sobre o título
      </Typography>
      <Box
        sx={{
          px: "2rem",
          pb: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextField
          onChange={handleTitle}
          value={work.mainTitle}
          fullWidth
          label="Titulo principal"
        />
        <TextField
          onChange={handleSubtitle}
          value={work.subtitle}
          fullWidth
          label="Subtítulo"
        />
      </Box>
    </Box>
  );
}
