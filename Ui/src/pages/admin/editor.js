import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Typography,
  MenuList,
  MenuItem,
  ListItemText,
} from "@mui/material/";
import { grey } from "@mui/material/colors/";
import { useState } from "react";
import Create from "src/admin/components/create";

const styleItemMenun = {
  borderRadius: "5px",
  mx: "0.5rem",
  "&:hover": {
    backgroundColor: grey[500],
    color: grey[900],
    cursor: "pointer",
  },
};

export default function Editor() {
  const [visible, setVisible] = useState(0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container //spacing={2}
      >
        <Grid
          xs={2}
          
          bgcolor={grey[900]}
          sx={{ color: "white" }}
        >
          <Box p={"1rem"}>
            <Typography variant="h5" gutterBottom sx={{ mb: 0 }}>
              BiblioKeia
            </Typography>
            <Typography variant="h5" gutterBottom>
              Editor
            </Typography>
          </Box>
          {/* Menu */}
          <MenuList>
            <MenuItem
              sx={
                visible == 0
                  ? {
                      ...styleItemMenun,
                      backgroundColor: grey[300],
                      color: grey[900],
                    }
                  : { ...styleItemMenun }
              }
              onClick={() => {
                setVisible(0);
              }}
            >
              <ListItemText>Registros</ListItemText>
            </MenuItem>
            <MenuItem
              sx={
                visible == 1
                  ? {
                      ...styleItemMenun,
                      backgroundColor: grey[300],
                      color: grey[900],
                    }
                  : { ...styleItemMenun }
              }
              onClick={() => {
                setVisible(1);
              }}
            >
              <ListItemText>Adicionar registro</ListItemText>
            </MenuItem>
          </MenuList>
        </Grid>
        <Grid xs={10}>
          <Typography
            variant="h5"
            sx={visible == 0 ? { display: "block" } : { display: "none" }}
          >
            Registros
          </Typography>

          <Box sx={visible == 1 ? { display: "block" } : { display: "none" }}>
            <Create />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
