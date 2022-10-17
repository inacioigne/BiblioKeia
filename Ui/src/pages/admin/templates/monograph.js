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
//import CreateWork from "src/admin/components/bibframe/create_work"
import CreateWork from "src/admin/components/bibframe/CreateWork";

const styleItemMenun = {
  borderRadius: "5px",
  mx: "0.5rem",
  "&:hover": {
    backgroundColor: grey[500],
    color: grey[900],
    cursor: "pointer",
  },
};

const styleItemMenunActive = {
  borderRadius: "5px",
  mx: "0.5rem",
  backgroundColor: grey[300],
  color: grey[900],
  "&:hover": {
    backgroundColor: grey[500],
    color: grey[900],
    cursor: "pointer",
  },
};

const metadadas = [
    'Creator of Work', 
    'Title Information', 
    'Form/Genre', 
    'Government publication',
    'Date of Work',
    'Place of Origin of the Work',
    '(Geographic) Coverage of the Content',
    '(Time) Coverage of the Content',
    'Intended Audience',
    'Other contributors'

]

export default function Monograph() {
  const [visible, setVisible] = useState(0);
  return (
    <Grid container>
      <Grid xs={3} bgcolor={grey[900]} sx={{ color: "white", p: "1rem" }}>
        <Typography variant="h5" gutterBottom>
          Obra
        </Typography>
        <MenuList>
        { metadadas.map((metadata, index) => (
            <MenuItem key={index}
            sx={
              visible == index
                ? {
                    ...styleItemMenunActive,
                  }
                : { ...styleItemMenun }
            }
            onClick={() => {
              setVisible(index);
            }}
            >
            <ListItemText>{metadata}</ListItemText>
            </MenuItem>
        ))}
          
        </MenuList>
      </Grid>
      <Grid xs={9}>
      <CreateWork />

      </Grid>
    </Grid>
  );
}
