import { Box, Typography, Paper } from "@mui/material/";
import { grey } from "@mui/material/colors/";

export default function BaseField({ name, field }) {
  return (
    <Box bgcolor={grey[100]} p={"2rem"}>
      <Typography variant="subtitle2">{name}</Typography>
      <Paper sx={{ p: "1rem", width: "30rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {field}
        </Box>
      </Paper>
    </Box>
  );
}
