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
  //setItems,
  //setNumFound,
  query,
  page
}) {
 

  const [assunto, setAssunto] = useState([]);
  const [autor, setAutor] = useState([]);
  const [ano, setAno] = useState([]);
  const [tipo, setTipo] = useState([]);
  const { handleSubmit, control, reset } = useForm();

  const {
    getData,
    numFound,
    //setNumFound,
    items,
    //setItems,
    facetSuject,
    facetAuthor,
    facetYear,
    facetType,
    filter,
    setPage
  } = useSearch();

  const onSubmit = () => {
    // let arr = [];
    // const filter = arr.concat(assunto, autor, ano, tipo);

    //alert(JSON.stringify(assunto));
    setPage(0)

    getData(query.field, query.term, page, filter);
  };

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
