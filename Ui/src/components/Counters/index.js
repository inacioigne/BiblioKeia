import { Box, Typography } from "@mui/material/";
import { indigo } from "@mui/material/colors";
import CountUp from "react-countup";

export default function Counters({ counter, title, description }) {
  return (
    <Box p={2} textAlign="center" lineHeight={1}>
      <Typography
        sx={{ fontWeight: "bold" }}
        variant="h4"
        color={indigo[500]}
        //textGradient
      >
      <CountUp 
      separator="."
      //decimals={4}
      //decimal=","
      end={counter} 
      duration={1} />+
    
      </Typography>
      <Typography sx={{ fontWeight: "bold" }} variant="subtitle1" mt={2} mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" color="text">
        {description}
      </Typography>
    </Box>
  );
}
