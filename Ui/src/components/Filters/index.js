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
  const getData = (field, assunto) => {
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
  
  const filter = {
    filter: [
      "subject:Pesquisa--Amazonas--Congressos",
      "year:1997"
    ]
  }

  {assunto:["Pesquisa--Amazonas--Congressos","Pesquisa--Congressos"]}

    api
      .get("select",
       {
        params: {
          q: `${field}:${assunto}`,
          "q.op": "AND",
          json: JSON.stringify(filter),
          wt: "json",
          facet: true,
          "json.facet": JSON.stringify(facet),
        },
      }
      )
      .then((response) => {
        console.log("Filtro: ", response.data);
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
  //   {
  //   defaultValues: {
  //     checkbox: false,
  //   },
  // }

  const onSubmit = () => {
    const params = {};
    if (assunto.length > 0) {
      params.assunto = assunto;
    }
    if (autor.length > 0) {
      params.autor = autor;
    }
    if (ano.length > 0) {
      params.ano = ano;
    }
    if (tipo.length > 0) {
      params.tipo = tipo;
    }

    alert(JSON.stringify(params))
    //getData(query.field, query.term);
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Refine sua busca
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button variant="outlined" type="submit">
          Limitar
        </Button>

        <Stack>
          {/* ASSUNTO */}
          <Facet
            subject={"Assunto"}
            facetSuject={facetSuject}
            control={control}
            state={assunto}
            setState={setAssunto}
          />

          {/* AUTOR */}
          <Facet
            subject={"Autor"}
            facetSuject={facetAuthor}
            control={control}
            state={autor}
            setState={setAutor}
          />

          <Facet
            subject={"Ano"}
            facetSuject={facetYear}
            control={control}
            state={ano}
            setState={setAno}
          />
          <Facet
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
