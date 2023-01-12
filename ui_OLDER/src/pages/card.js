// MUI
import {
  Box,
  Container,
  IconButton,
  Typography,
  Divider,
  Grid,
  Button,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Pagination,
} from "@mui/material/";
import Image from "next/image";
export default function CardTest() {
  return (
    <Container>
      <Box
        sx={{
          mt: "5rem",
          width: 180,
          height: 200,
          position: "relative",
          objectFit: "cover",
          borderRadius: "10px",
          overflow: "hidden",
          background: "grey",
          transition: "background 0.8s",
          background: "black",
          boxShadow: "0 70px 63px -60px #000000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
       <Image
            src="http://commons.wikimedia.org/wiki/Special:FilePath/Machado_de_Assis_real_negro.jpg"
            layout="fill"
          />
        <Box sx={{
            height: 180,
            width: 200,
            background: "transparent",
            borderRadius: "10px",
            transition: "border 1s",
            position: "relative",
            "&:hover" : {
                border: "1px solid white"
            }
        }}>
         
        </Box>
        
      </Box>
    

    </Container>
  );
}
