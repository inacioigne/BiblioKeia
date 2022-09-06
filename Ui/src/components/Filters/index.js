import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  Divider,
  Stack,
} from "@mui/material/";

import Facet from "./facet";


export default function Filters({ facetSuject, facetAuthor, facetYear, facetType }) {
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Refine sua busca
      </Typography>
      <Stack >
      <Facet subject={"Assunto"} facetSuject={facetSuject} />
      <Facet subject={"Autor"} facetSuject={facetAuthor} />
      <Facet subject={"Ano"} facetSuject={facetYear} />
      <Facet subject={"Tipo"} facetSuject={facetType} />

      </Stack>
     
    </Box>
  );
}
