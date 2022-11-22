import { Box, Typography, Paper } from "@mui/material/";
import Type from "./type"


export default function Content(

  ) {
  return (
    <Box>
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
