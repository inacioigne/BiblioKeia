import { TextField, Box, Button, IconButton  } from "@mui/material/";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import ThesarusBK from "./thesarusBK";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Field() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      subjects: [{ subject: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subjects",
  });
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {fields.map((subject, index) => (
        <Box key={subject.id} sx={{ display: "flex", gap: "1rem"}}
        >
          <ThesarusBK />
          <IconButton onClick={() => remove(index)}>
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
  );
}
