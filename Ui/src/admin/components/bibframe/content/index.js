import { Box, Typography, Paper } from "@mui/material/";
import Type from "./type"


export default function Content(
 // { values, setValues}
  ) {
  return (
    <Box>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Tipo
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
         <Type 
         //setValues={setValues} values={values} 
         /> 
        </Paper>
      </Box>
    </Box>
  );
}
