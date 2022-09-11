import { Stack, Box, Container, Typography } from "@mui/material/";
import NavItems from "src/components/Navbar/NavItems";
import { grey, blueGrey } from "@mui/material/colors";

export default function Navbar() {
    return (
        <Box
        sx={{
          height: "5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: '2rem',
          borderBottom: 'solid'
        }}
      >
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
      
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <NavItems item={"Serviços"} />
          <NavItems item={"Cursos"} />
        </Box>
      </Box>
    )
}