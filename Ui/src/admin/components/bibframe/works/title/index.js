import { Box, Typography, Paper } from "@mui/material/";
import { grey } from "@mui/material/colors/";
import TitleInformation from "./titleInfornation"

export default function Title( { values, setValues }) {
  return (
    <Box bgcolor={grey[100]}> 
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Title Information
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
         <TitleInformation values={values} setValues={setValues} />
        </Paper>
      </Box>
    </Box>
  );
}
