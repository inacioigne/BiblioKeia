// MUI
import { Box, Typography, TextField } from "@mui/material/";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function ResponsibilityStatement() {

    const { instance, setInstances } = useBf();

    const handleResponsibility = (e) => {
        setInstances((prevState) => ({
          ...prevState,
          responsibility: e.target.value,
        }));
      };

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Responsabilidades
      </Typography>
      <Box
        sx={{
          px: "2rem",
          pb: "2rem"
        }}
      >
        <TextField
          onChange={handleResponsibility}
          value={instance.responsibility}
          fullWidth
          label="Responsabilidades"
        />
      </Box>
    </Box>
  );
}
