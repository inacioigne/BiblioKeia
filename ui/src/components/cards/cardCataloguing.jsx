"use client";
// MUI Components
import { Typography, Card, CardContent, IconButton, Box } from "@mui/material";

// Next Components
import Link from "next/link";

export default function CardCataloguing({ name, link, Icon }) {
  return (
    <Card
      sx={{
        width: 230,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Template
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href={link}>
            <IconButton color="primary">
              <Icon sx={{ fontSize: 50 }} />
            </IconButton>
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
}
