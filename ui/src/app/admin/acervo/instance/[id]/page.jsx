
"use client";
// MUI
import {
  Container,
  Paper,
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
} from "@mui/material/";

export default function Instance({ params }) {
    return (
        <Container maxWidth="xl">Instance {params.id}</Container>
    )
}