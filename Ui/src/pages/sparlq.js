import { api } from "src/services/lcnfa";
import {
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material/";
import fetch from "@rdfjs/fetch";
import namespace from "@rdfjs/namespace";
import cf from "clownface";
import { useForm, Controller } from "react-hook-form";
import { Search } from "@mui/icons-material";
//import  fromFile  from "rdf-utils-fs";
//import {relators} from "src/services/relators.madsrdf.jsonld"
import SparqlClient from "sparql-http-client";

export default function Sparql(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      relationship: "",
    },
  });

  async function getData(data) {
    const client = new SparqlClient({
      endpointUrl: "http://localhost:3030/relators/sparql",
    });
    const query = `PREFIX madsrdf: <http://www.loc.gov/mads/rdf/v1#>
    SELECT ?object
    WHERE {
      ?subject madsrdf:authoritativeLabel ?object
      FILTER regex(?object, "^${data}") 
    }
    LIMIT 10`;

    const stream = await client.query.select(query)
    stream.on('data', row => {
      console.log(row.object.value)
    })
    //console.log(stream);
  }


  const handleSearch = (data) => {
    console.log("SEARCH: ", data);
    //getData(data.relationship)
  };

  const handleOnChange = (str) => {
    let data = str.charAt(0).toUpperCase() + str.slice(1)
    getData(data)
    //console.log(data)

  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mt: "5rem",
        width: "50rem",
      }}
    >
      <Button
        variant="outlined"
        onClick={() => {
          getData();
          //Test()
        }}
      >
        Sparql
      </Button>
      {/** Relationship Designator */}
      <form onSubmit={handleSubmit(handleSearch)}>
        <Controller
        
          control={control}
          name="relationship"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Relationship Designator"
              onChange={(e) => {
                field.onChange(e)
                //console.log(e.target.value)
                handleOnChange(e.target.value)
               
                }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      color="primary"
                      aria-label="search"
                      component="button"
                      type="submit"
                    >
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </form>
    </Box>
  );
}

// export function getStaticProps() {

//   const dataset =  getData()

//   return { props: {msg: "dataset"} }
// }
