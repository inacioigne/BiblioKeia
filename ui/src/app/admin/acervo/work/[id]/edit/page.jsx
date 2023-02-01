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

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Edit() {

    const { workEdit } = useBf();
    
    return (
        <Container maxWidth="xl"> <h1>Edit</h1></Container>
   )
}