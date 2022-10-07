import {
  Stack,
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  Paper,
} from "@mui/material/";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

// Next Components
import Image from "next/image";

import { useState } from "react";

const styleText = {
    //fontFamily: "Alkalami"
    fontFamily: "Sarabun",
  };

export default function Carousel() {
  const imgs = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);
  const [carousel, setCarousel] = useState(imgs.slice(0, 5));
  const [count, setCount] = useState(5);

  const handleRightClick = (e) => {
    setLeft(left + 5);
    setRight(right + 5);
  };

  const handleLeftClick = (e) => {
    setLeft(left - 5);
    setRight(right - 5);
  };

  return (
    <Container maxWidth="md">
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: "Sarabun",
            pt: "1.5rem"
          }}
        >
          Obras similares
        </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          pb: "2rem"
        }}
      >
        
        {left != 0 && (
          <Box>
            <IconButton color="primary" onClick={handleLeftClick}>
              <ArrowBack />
            </IconButton>
          </Box>
        )}

        <Stack mt={2} spacing={5} direction="row">
          {imgs.slice(left, right).map((img) => (
            <Box key={img} sx={{ boxShadow: 10 }}>
              <Image
                src={`http://localhost:8000/items/${img}/imagem`}
                width={150}
                height={200}
              />
            </Box>
          ))}
        </Stack>
        {right < imgs.length && (
          <Box>
            <IconButton color="primary" onClick={handleRightClick}>
              <ArrowForward />
            </IconButton>
          </Box>
        )}
      </Box>
    </Container>
  );
}
