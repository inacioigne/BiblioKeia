import {
  Box,
  Typography,
  Select,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Stack,
  IconButton,
  Button,
  Paper,
  Menu,
  MenuItem,
  MenuList,
} from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import SearchLCNAF from "src/admin/components/bibframe/CreateWork/search_LCNAF";
import { api } from "src/services/lcnfa";
import SparqlClient from "sparql-http-client";
import rdf from "rdf-ext";
import Relationship from "./relationship";
import Authority from "./authority";

export default function CreateWork() {
  const [type, setType] = useState("person");
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu1 = Boolean(anchorEl);
  const [openMenu, setopenMenu] = useState(null);
  const [relators, setRelators] = useState(null);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget.position);
  };

  const handleCloseMenu = () => {
    // console.log("close");
    setAnchorEl(null);
    setopenMenu(false);
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     type: "PersonalName",
  //     authority: "",
  //     relationship: "",
  //   },
  // });

 
  
  return (
    <Box bgcolor={grey[100]} onMouseLeave={handleCloseMenu}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Creator of Work
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/** Authority*/}
            <Authority />
            {/** Relationship Designator */}
            <Relationship />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
