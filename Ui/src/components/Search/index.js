import { Paper, InputBase, IconButton, Box } from "@mui/material/";
import SearchIcon from "@mui/icons-material/Search";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { red, green, blue } from '@mui/material/colors';

import { styled } from '@mui/material/styles';



const RootSearch = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    //backgroundColor: red[500],
    width: 300,
  },
  [theme.breakpoints.up('md')]: {
    //backgroundColor: blue[500],
    width: 400,
  },
  [theme.breakpoints.up('lg')]: {
    //backgroundColor: green[500],
    width: 800,
    //border: "solid"
  },
}));

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
      router.push(`/search?q=general_search:${data.search}`);
    }
  };


  return (

      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          
        }}
      >
        <RootSearch>
        <Paper
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            //width: 400,
          }
        }
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
        </RootSearch>
      </Box>
  );
}
