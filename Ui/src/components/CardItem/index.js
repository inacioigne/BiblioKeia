import {
  Card,
  Typography,
  CardContent,
  Divider,
  Box,
  Button,
  CardActions,
} from "@mui/material/";
import Image from "next/image";
import {
  MenuBook,
  FileCopy,
  SouthAmerica,
  AddToPhotos,
  FactCheck,
} from "@mui/icons-material";

const styleDatails = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
};

export default function CardItem({
  id,
  title,
  responsibilities,
  publisher,
  subjects,
  chamada,
  shelf,
}) {
  return (
    <Card
      sx={{
        minWidth: 275,
      }}
    >
      <Box
        sx={{
          minWidth: 275,
          display: "flex",
        }}
      >
        <Box p={3}>
          <Image
            src={
              `http://localhost:8000/items/${id}/imagem`
            }
            width={150}
            height={200}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Button
                size="small"
                sx={{
                  textTransform: "none",
                }}
                startIcon={<MenuBook />}
              >
                Livro
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              {/** AUTORES */}
              {responsibilities != "false" && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="button"
                    display="block"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      textTransform: "none",
                    }}
                  >
                    Autores
                  </Typography>
                  <Typography
                    variant="button"
                    display="block"
                    textTransform="none"
                    gutterBottom
                  >
                    {responsibilities}
                  </Typography>
                  <Divider orientation="vertical" flexItem />
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Editora
                </Typography>
                <Typography
                  variant="button"
                  display="block"
                  textTransform="none"
                  gutterBottom
                >
                  {publisher}
                </Typography>
                <Divider orientation="vertical" flexItem />
              </Box>
              {/* ANO */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                }}
              >
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Ano
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                  2022
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "auto auto",
              }}
            >
              {/* ASSUNTOS */}
              <Box>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                >
                  Assuntos:
                </Typography>
                {subjects.map((subject, index) => (
                  <Button
                    key={index}
                    variant="text"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    {subject}
                  </Button>
                ))}
              </Box>
              {/* OUTROS DETALHES */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  gap: 1,
                }}
              >
                <Divider orientation="vertical" flexItem />
                {/* Páginas */}
                <Box
                  sx={{
                    ...styleDatails,
                  }}
                >
                  <Typography variant="caption" display="block" gutterBottom>
                    Páginas
                  </Typography>
                  <FileCopy />
                  <Typography
                    variant="caption"
                    display="block"
                    fontWeight="bold"
                    gutterBottom
                  >
                    288 páginas
                  </Typography>
                </Box>
                {/* Idioma */}
                <Box
                  sx={{  ...styleDatails
                  }}
                >
                  <Typography variant="caption" display="block" gutterBottom>
                    Idioma
                  </Typography>
                  <SouthAmerica />
                  <Typography
                    variant="caption"
                    display="block"
                    fontWeight="bold"
                    gutterBottom
                  >
                    Português
                  </Typography>
                </Box>
                {/* CDD */}
                <Box
                  sx={{
                    ...styleDatails
                  }}
                >
                  <Typography variant="caption" display="block" gutterBottom>
                    Classificação
                  </Typography>
                  <AddToPhotos />
                  <Typography
                    variant="caption"
                    display="block"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {chamada}
                  </Typography>
                </Box>
                {/* LOCALIZAÇÃO */}
                <Box
                  sx={{
                    ...styleDatails
                  }}
                >
                  <Typography variant="caption" display="block" gutterBottom>
                    Localização
                  </Typography>
                  <FactCheck />
                  <Typography
                    variant="caption"
                    display="block"
                    fontWeight="bold"
                    gutterBottom
                  >
                    {shelf}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined">
              Detalhes
            </Button>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
}
