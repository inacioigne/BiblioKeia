import {
  Stack,
  Box,
  Container,
  Typography,
  Divider,
  Button,
} from "@mui/material/";

export default function Details({ label, icon, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="caption" display="block" gutterBottom>
        {label}
      </Typography>
      {icon}
      <Typography
        variant="caption"
        display="block"
        fontWeight="bold"
        gutterBottom
      >
        {value}
      </Typography>
    </Box>
  );
}
