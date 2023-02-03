// MUI
import { Box, Typography, IconButton, Button } from "@mui/material/";
import RemoveIcon from "@mui/icons-material/Remove";

// react-hook-form
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

// BiblioKeia Components
import ThesarusBK from "./thesarusBK";

// React Hooks
import { useState, useEffect } from "react";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Subject() {
  const { work, setWork } = useBf();

  const [listSubject, setListSubject] = useState([]);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      //subjects: [{ label: "test1" }],
      subjects: work?.subjects
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });

  useEffect(() => {
    work.subjects.forEach(element => {
      console.log("E:", element.label)
      append(element);
      
    });

    setWork((prevState) => ({
      ...prevState,
      subjects: listSubject,
    }));

    
  }, [listSubject]);

  return (
    <Box sx={{ p: "1rem" }}>
      <Typography variant="subtitle2" sx={{ pb: "1rem" }}>
        Assunto
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {fields.map((subject, index) => (
          <Box key={subject.id} sx={{ display: "flex", gap: "1rem" }}>
            <ThesarusBK
              listSubject={listSubject}
              setListSubject={setListSubject}
             
            />
            <IconButton
              onClick={() => {
                let recuse = listSubject.filter((value, i) => {
                  return i !== index;
                });
                setListSubject(recuse);
                remove(index);
                console.log(subject);
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          onClick={() => {
            append({ subject: "" });
          }}
        >
          Adicionar Assunto
        </Button>
      </Box>
    </Box>
  );
}
