import { Box, Typography, Paper } from "@mui/material/";
import { grey } from "@mui/material/colors/";
import SubjectField from "./subject"

export default function Subject() {
  return (
    <Box bgcolor={grey[100]}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Assunto
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
         <SubjectField />
        </Paper>
      </Box>
    </Box>
  );
}
