import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  TextField,
  InputAdornment
} from "@mui/material/";
import { grey } from "@mui/material/colors/";
import SubjectField from "./subject";
import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
// import AddIcon from "@mui/icons-material/Add";
import { Remove, Search } from "@mui/icons-material";
import ThesaurusBK from "./thesaurus_bk"

export default function Subject() {
  //{ listSubject, SetListSubject }
  const [ openThesaurusBK, setThesaurusBK] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    setThesaurusBK(true)
    // setOpen(true);
    // getData(subject, type);
    // setDisabled(false);
  };

  const inputPros = {
    //disabled: disabled,
    // startAdornment:
    //   name !== "" ? (
    //     <InputAdornment position="start">
    //       <Typography
    //         variant="subtitle2"
    //         gutterBottom
    //         sx={{
    //           display: "flex",
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             borderRight: "solid 1px",
    //             borderTopLeftRadius: "5px",
    //             borderBottomLeftRadius: "5px",
    //             px: "5px",
    //             pt: "2px",
    //             backgroundColor: blue[200],
    //           }}
    //         >
    //           {name}
    //         </Box>

    //         <Close
    //           sx={{
    //             fontSize: "25px",
    //             px: "5px",
    //             color: blue[800],
    //             backgroundColor: red[200],
    //             cursor: "pointer",
    //             borderTopRightRadius: "5px",
    //             borderBottomRightRadius: "5px",
    //           }}
    //           onClick={() => {
    //             setDisabled(false);
    //             setName("");
    //           }}
    //         />
    //       </Typography>
    //     </InputAdornment>
    //   ) : null,
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          color="primary"
          aria-label="search"
          component="button"
          onClick={handleSearch}
        >
          <Search />
        </IconButton>
      </InputAdornment>
    ),
  };

  

  const { control, handleSubmit } = useForm({
    defaultValues: {
      subjects: [{ topic: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  
  return (
    <Box bgcolor={grey[100]}>
      <Box p={"2rem"}>
        <Typography variant="subtitle2" gutterBottom>
          Assunto
        </Typography>
        <Paper sx={{ p: "1rem", width: "30rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {fields.map((subjects, index) => (
              <Box
                key={subjects.id}
                sx={{
                  display: "flex",
                }}
              >
                <Controller
                  name={`subjects.${index}.topic`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      // onChange={(e) => {
                      //   setSubject(e.target.value);
                      // }}
                      // value={subject}
                      fullWidth
                      label="Assunto"
                      InputProps={inputPros}
                    />
                  )}
                />
                <IconButton onClick={() => remove(index)}>
                  <Remove />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Button
            onClick={() => {
              append({ topic: "" });
            }}
          >
            Adicionar Item
          </Button>

          {/*
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "1rem",
            }}
          >
            {[...Array(fields).keys()].map((field) => (
              <Box key={field} sx={{ display: "flex" }}>
                <SubjectField
                  listSubject={listSubject}
                  SetListSubject={SetListSubject}
                />
              </Box>
            ))} 
            <Button variant="outlined" onClick={() => setFields(fields + 1)}>
              Mais Assuntos
            </Button>
          </Box>*/}
        </Paper>
      </Box>
      {/** Thesaurus */}
      <ThesaurusBK open={openThesaurusBK} setOpen={setThesaurusBK} />
    </Box>
  );
}
