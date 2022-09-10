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

export default function Filters({
  setItems,
  setNumFound,
  facetSuject,
  setfacetSuject,
  facetAuthor,
  setfacetAuthor,
  facetYear,
  setfacetYear,
  facetType,
  setfacetType,
  query,
}) {
  const getData = (field, assunto, filter) => {
    const facet = {
      subject: {
        field: "subject_str",
      },
      author: {
        field: "author_str",
      },
      year: {
        field: "year",
      },
      type: {
        field: "type",
      },
    };

    const json_filter = {
      filter: filter,
    };

    api
      .get("select", {
        params: {
          q: `${field}:${assunto}`,
          "q.op": "OR",
          json: JSON.stringify(json_filter),
          wt: "json",
          facet: true,
          "json.facet": JSON.stringify(facet),
        },
      })
      .then((response) => {
        console.log("Filtro: ", response.data);
        setNumFound(response.data.response.numFound)
        setItems(response.data.response.docs);
        setfacetSuject(response.data.facets.subject.buckets);
        setfacetAuthor(response.data.facets.author.buckets);
        setfacetYear(response.data.facets.year.buckets);
        setfacetType(response.data.facets.type.buckets);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [assunto, setAssunto] = useState([]);
  const [autor, setAutor] = useState([]);
  const [ano, setAno] = useState([]);
  const [tipo, setTipo] = useState([]);
  const { handleSubmit, control, reset } = useForm();
 

  const onSubmit = () => {
    let arr = []
    const filter = arr.concat(assunto, autor, ano, tipo);

    //alert(JSON.stringify(assunto));
    getData(query.field, query.term, filter);
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
