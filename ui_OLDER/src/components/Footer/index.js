import { Box, Typography } from "@mui/material/";
import { blueGrey } from "@mui/material/colors";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";
import FooterItems from "src/components/Footer/footerItems"

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
       possiton: 'absolute',
        bottom: 0,
        mx: "3rem",
        display: "flex",
        gap: "5rem",
      }}
    >
      <Box>
        <Typography
          variant="button"
          fontWeight="bold"
          fontSize={12}
          color={blueGrey[900]}
        >
          Biblioteca do INPA
        </Typography>
        <Box
          sx={{
            mt: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Facebook sx={{ color: blueGrey[900] }} />
          <Twitter sx={{ color: blueGrey[900] }} />
          <Instagram sx={{ color: blueGrey[900] }} />
          <YouTube sx={{ color: blueGrey[900] }} />
        </Box>
      </Box>
    
      <FooterItems title='Biblioteca' items={['Sobre nós', 'Equipe', 'Trabalho conosco', 'Contato']}/>
      <FooterItems title='Bases' items={['Repositório Institucional', 'Periódicos Capes', 'Dados Abertos']}/>
      <FooterItems title='Serviços' items={['Ficha catalográfica', 'Nada consta', 'Levantamento bibliográfico', 'Solicitação de cópias']}/>
   
    </Box>
  );
}
