import { Box, Typography, Paper } from "@mui/material/";
import { grey } from "@mui/material/colors/";
import Type from "./type"


export default function Content() {
  return (
    <Box bgcolor={grey[100]}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Tipo
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
         <Type /> 
        </Paper>
      </Box>
    </Box>
  );
}
