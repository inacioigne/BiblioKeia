import {
  InputLabel,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material/";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";


export default function AdvancedSearch({ getData }) {
  const [field, setField] = useState('general_search');
  const [search, setSearch] = useState();

  const handleField = (e) => {
    setField(e.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(field, search)
    getData(field, search)
    //alert('SUMBITE')
  }
  return (
    <Box sx={{ m: "2rem" }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <form onSubmit={handleSubmit}>
        <FormControl
          variant="filled"
          sx={{
            m: 1,
            minWidth: 200,
          }}
        >
          <InputLabel id="label">Buscar em</InputLabel>
          <Select
            labelId="label"
            id="demo-simple-select-standard"
            defaultValue={"general_search"}
            value={field}
            onChange={handleField}
         
          >
            <MenuItem value={"general_search"}>Todos os campos</MenuItem>
            <MenuItem value={"title"}>Título</MenuItem>
            <MenuItem value={"subject"}>Assunto</MenuItem>
            <MenuItem value={"author"}>Autor</MenuItem>
          </Select>
        </FormControl>
        <FormControl
          variant="filled"
          sx={{
            m: 1,
            minWidth: 400,
          }}
        >
          <TextField
            id="filled-basic"
            label="Faça uma busca"
            variant="filled"
            //value={search}
            onChange={handleSearch}
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            minWidth: 50,
          }}
        >
          <IconButton type="submit" color="primary" aria-label="search" size="large">
            <SearchIcon  fontSize={"6rem"} />
          </IconButton>
        </FormControl>
        </form>
      </Box>
    </Box>
  );
}
