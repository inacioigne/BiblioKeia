// MUI
import { Box, Typography, IconButton, Button } from "@mui/material/";

// react-hook-form
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";

// BiblioKeia Components
import ThesarusBK from "./thesarusBK";

// BiblioKeia Hooks
import { useBf } from "src/providers/bibframe";

export default function Subject() {
    

  const { work, setWork } = useBf();

  const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    defaultValues: {
        test: [{ firstName: "Bill", lastName: "Luo" }]
      }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });

//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       //subjects: work?.subjects,
//       subjects: "ASS",
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "subjects",
//   });
  console.log("SB: ", fields)

  return (
    <Box sx={{ p: "1rem" }}>
      <Typography variant="subtitle2" sx={{ pb: "1rem" }}>
        Assunto
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {fields.map((subject, index) => (
          <Box key={subject.id} sx={{ display: "flex", gap: "1rem" }}>
            <ThesarusBK />
          </Box>
        ))}
      </Box>
    </Box>
  );
// return (
//     <form onSubmit={handleSubmit(data => console.log(data))}>
//       <ul>
//         {fields.map((item, index) => (
//           <li key={item.id}>
//             <input {...register(`test.${index}.firstName`)} />
//             <Controller
//               render={({ field }) => <input {...field} />}
//               name={`test.${index}.lastName`}
//               control={control}
//             />
//             <button type="button" onClick={() => remove(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <button
//         type="button"
//         onClick={() => append({ firstName: "bill", lastName: "luo" })}
//       >
//         append
//       </button>
//       <input type="submit" />
//     </form>
//   );
}
