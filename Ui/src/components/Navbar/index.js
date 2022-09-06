import { Typography, Box } from "@mui/material/";
import { grey, blueGrey } from "@mui/material/colors";
import NavItems from "./NavItems";

const NavBox = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  p: 1,
  my: 2,
  mx: '3rem',
  boxShadow: 3,
  color: "dark",
  borderRadius: 3,
  backgroundColor: grey[300],
  width: '100%',
  
};


export default function Navbar() {
  return (

    <Box 
    sx={{ 
      position: "absolute", 
      top: 0,  
      width: "calc(100% - 6rem)"
       }}
    >
      <Box sx={{ ...NavBox }}>
        <Box lineHeight={1} py={0.75} pl={1}>
          <Typography
            variant="button"
            fontWeight="bold"
            fontSize={12}
            color={blueGrey[900]}
          >
            Biblioteca do INPA
          </Typography>
        </Box>
        <Box sx={{display: 'flex', gap: '1rem'}}>
        <NavItems item={'Serviços'}/>
        <NavItems item={'Cursos'}/>

        </Box>
        
        
      </Box>
    </Box>

  );
}
