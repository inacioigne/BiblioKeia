import { Paper, InputBase, IconButton, Box } from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

export default function SearchBox() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = (data) => {
    if (data.search == "") {
      router.push(`/search?q=*:*`);
    } else {
      router.push(`/search?q=${data.search}`);
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        top: "30vh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Faça uma busca"
                inputProps={{ "aria-label": "Faça uma busca" }}
              />
            )}
          />

          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
}
