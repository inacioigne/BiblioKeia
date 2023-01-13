// MUI
import { Box, Typography } from "@mui/material/";

// BiblioKeia Components
import NamesBK from "src/components/thesaurus/namesBK";
import Relationship from "src/components/thesaurus/relators";

export default function Contribution() {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ p: "1rem" }}>
        Responsabilidades
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem", px: "2rem", pb: "2rem" 
        }}
      >
        <NamesBK />
        <Relationship />
      </Box>
    </Box>
  );
}
