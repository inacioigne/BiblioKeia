import { Box, Typography, Paper } from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState } from "react";

import Relationship from "./relationship";
import Authority from "./authority";
//import NamesBK from "src/admin/components/bibframe/works/contribution/namesBK"
import NamesBK from "src/admin/components/thesaurus/names"

export default function Contribution() {

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setopenMenu] = useState(null);


  const handleCloseMenu = () => {
    setAnchorEl(null);
    setopenMenu(false);
  };

  return (
    <Box bgcolor={grey[100]} onMouseLeave={handleCloseMenu}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Autor:
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
          <NamesBK />
            {/** Authority
            <Authority />*/}
            {/** Relationship Designator */}
            <Relationship />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
