import { Box, Typography, Paper } from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState } from "react";

import Relationship from "./relationship";
import Authority from "./authority";

export default function CreateWork() {
  // const [type, setType] = useState("person");
  // const [open, setOpen] = useState(false);

  // const [search, setSearch] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  // const openMenu1 = Boolean(anchorEl);
  const [openMenu, setopenMenu] = useState(null);
  // const [relators, setRelators] = useState(null);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleOpenMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  //   console.log(event.currentTarget.position);
  // };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setopenMenu(false);
  };

  // const handleChange = (event) => {
  //   setType(event.target.value);
  // };

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
