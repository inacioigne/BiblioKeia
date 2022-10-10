import {
  Typography,
  Box,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Stack,
} from "@mui/material/";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";

import Facet from "./facet";
import { api } from "src/services/solr";

import { useSearch } from "src/providers/search";

export default function Filters({
  query
}) {
 

  const [assunto, setAssunto] = useState([]);
  const [autor, setAutor] = useState([]);
  const [ano, setAno] = useState([]);
  const [tipo, setTipo] = useState([]);
  const { handleSubmit, control, reset } = useForm();

  const {
    getData,
    facetSuject,
    facetAuthor,
    facetYear,
    facetType,
    filter,
    setFilter
  } = useSearch();

  const onSubmit = () => {

    getData(query.field, query.term, 0, 'OR', filter); 
  };

  useEffect(() => {

   
    setFilter([])


    
  }, []);

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Refine sua busca
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button mb={1} variant="outlined" type="submit">
          Filtrar
        </Button>

        <Stack mt={2}>
          {/* ASSUNTO */}
          <Facet
            metadata={"subject"}
            subject={"Assunto"}
            facetSuject={facetSuject}
            control={control}
            state={assunto}
            setState={setAssunto}
          />

          {/* AUTOR */}
          <Facet
            metadata={"author"}
            subject={"Autor"}
            facetSuject={facetAuthor}
            control={control}
            state={autor}
            setState={setAutor}
          />
          {/* Ano */}
          <Facet
            metadata={"year"}
            subject={"Ano"}
            facetSuject={facetYear}
            control={control}
            state={ano}
            setState={setAno}
          />
          <Facet
            metadata={"type"}
            subject={"Tipo"}
            facetSuject={facetType}
            control={control}
            state={tipo}
            setState={setTipo}
          />
        </Stack>
      </form>
    </Box>
  );
}
