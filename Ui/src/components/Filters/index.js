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


export default function Filters({ facetSuject, facetAuthor, facetYear, facetType }) {
  const [data, setData] = useState(null);
  
  const { handleSubmit, control, reset } =
  useForm();
  //   {
  //   defaultValues: {
  //     checkbox: false,
  //   },
  // }

const onSubmit = (data) => console.log(data);
const handleChange = (event) => {

  setData({
    ...data,
    [event.target.name]: event.target.checked,
  });
  console.log('EV: ', data)
};
  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h6" gutterBottom>
        Refine sua busca
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>

      
      <Button variant="outlined" type="submit">Limitar</Button>
     

      <Stack >
      <FormGroup>
          <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="gilad" />
            }
            label="Gilad Gray"
          />
          <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="jason" />
            }
            label="Jason Killian"
          />
          <FormControlLabel
            control={
              <Checkbox  onChange={handleChange} name="antoine" />
            }
            label="Antoine Llorca"
          />
        </FormGroup>
      <Facet subject={"Assunto"} facetSuject={facetSuject} control={control} />
      <Facet subject={"Autor"} facetSuject={facetAuthor} control={control} />
      <Facet subject={"Ano"} facetSuject={facetYear} control={control} />
      <Facet subject={"Tipo"} facetSuject={facetType} control={control} />

      </Stack>
      </form>
     
    </Box>
  );
}
