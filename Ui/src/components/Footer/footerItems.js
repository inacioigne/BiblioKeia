import { Box, Typography } from "@mui/material/";

export default function FooterItems({ title, items }) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          mb: "1rem",
          fontSize: "1rem",
        }}
      >
        {title}
      </Typography>
      {items.map((item, index) => (
        <Box key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            mb: "1rem",
          }}
        >
          <Typography key={index} variant="body2">
            {item}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
