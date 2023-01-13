// MUI
import { Box, Typography, TextField } from "@mui/material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

// React Hooks
import { useEffect } from "react";

export default function Title() {
  const { work, instance, setInstances } = useBf();

  useEffect(() => {
    setInstances((prevState) => ({
      ...prevState,
      mainTitle: work.mainTitle,
    }));
    setInstances((prevState) => ({
        ...prevState,
        subtitle: work.subtitle,
      }));
  }, [work.mainTitle, work.subtitle]);

  const handleTitle = (e) => {
    setInstances((prevState) => ({
      ...prevState,
      mainTitle: e.target.value,
    }));
  };

  const handleSubtitle = (e) => {
    setInstances((prevState) => ({
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
          value={instance.mainTitle}
          fullWidth
          label="Titulo principal"
        />
        <TextField
          onChange={handleSubtitle}
          value={instance.subtitle}
          fullWidth
          label="Subtítulo"
        />
      </Box>
    </Box>
  );
}
