// Material UI
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  DialogTitle,
  DialogContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Button,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import { grey, deepPurple, indigo } from "@mui/material/colors";
import {
  ArrowForwardIos,
  Roofing,
  MenuBook,
  Title,
  Person,
  Subject,
  Translate,
  Class,
  Logout,
  DarkMode,
  LightMode,
} from "@mui/icons-material/";
import {
  styled,
  useTheme,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

import { useState, createContext, useContext, useMemo } from "react";

// Nexts components
import Image from "next/image";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {" "}
      {theme.palette.mode} mode{" "}
    </Box>
  );
}

const styleText = { color: grey[600] };

const primaryColor = indigo[500];
const sideBarColor = grey[50];
const textColor = grey[600];
// Transistion
const tran03 = "all 0.2s ease";
const tran04 = "all 0.3s ease";
const tran05 = "all 0.5s ease";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

export default function Admin() {
  //const theme = useTheme();
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        console.log("mode");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box
          component="nav"
          sx={{
            // border: "solid",
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "250px",
            padding: "10px 14px",
            //background: sideBarColor,
            bgcolor: "background.default",
          }}
        >
          {/* header */}
          <Box component="header" sx={{ position: "relative" }}>
            {/* Image Text */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                component="span"
                sx={{ minWidth: "60px", display: "flex", alignItems: "center" }}
              >
                <Avatar
                  variant="square"
                  sx={{
                    bgcolor: deepPurple[500],
                    borderRadius: "6px",
                  }}
                >
                  BK
                </Avatar>
              </Box>
              {/* header text */}
              <Box
                sx={{ ...styleText, display: "flex", flexDirection: "column" }}
              >
                {/* name */}
                <Typography
                  component="span"
                  sx={{ fontSize: "16px", fontWeight: 600 }}
                >
                  BiblioKeia
                </Typography>
                <Typography component="span" sx={{ marginTop: "-2px" }}>
                  Dashboard
                </Typography>
              </Box>
            </Box>
            {/* Toglle */}
            <IconButton
              component="i"
              size="small"
              //color="primary"
              sx={{
                position: "absolute",
                top: "50%",
                right: "-25px",
                transform: "translateY(-50%)",
                height: "25px",
                width: "25px",
                backgroundColor: indigo[500],
                color: "white",
                ":hover": { backgroundColor: indigo[400] },
              }}
            >
              <ArrowForwardIos fontSize="inherit" />
            </IconButton>
          </Box>
          {/* menu bar */}
          <Box
            sx={{
              //border: "solid",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "calc(100% - 40px)",
            }}
          >
            <MenuList
              sx={{
                transition: tran03,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                mt: "1.5rem",
              }}
            >
              {/* menu links */}
              <MenuItem
                sx={{
                  color: textColor,
                  borderRadius: "6px",
                  ":hover": {
                    backgroundColor: primaryColor,
                    color: sideBarColor,
                  },
                }}
              >
                <ListItemIcon>
                  <MenuBook />
                </ListItemIcon>
                <ListItemText>Tipo</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  color: textColor,
                  borderRadius: "6px",
                  ":hover": {
                    backgroundColor: primaryColor,
                    color: sideBarColor,
                  },
                }}
              >
                <ListItemIcon>
                  <Title />
                </ListItemIcon>
                <ListItemText>Título</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  color: textColor,
                  borderRadius: "6px",
                  ":hover": {
                    backgroundColor: primaryColor,
                    color: sideBarColor,
                  },
                }}
              >
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText>Autor</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  color: textColor,
                  borderRadius: "6px",
                  ":hover": {
                    backgroundColor: primaryColor,
                    color: sideBarColor,
                  },
                }}
              >
                <ListItemIcon>
                  <Subject />
                </ListItemIcon>
                <ListItemText>Assunto</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  color: textColor,
                  borderRadius: "6px",
                  ":hover": {
                    backgroundColor: primaryColor,
                    color: sideBarColor,
                  },
                }}
              >
                <ListItemIcon>
                  <Translate />
                </ListItemIcon>
                <ListItemText>Idioma</ListItemText>
              </MenuItem>
              <MenuItem
                sx={{
                  color: textColor,
                  borderRadius: "6px",
                  ":hover": {
                    backgroundColor: primaryColor,
                    color: sideBarColor,
                  },
                }}
              >
                <ListItemIcon>
                  <Class />
                </ListItemIcon>
                <ListItemText>Classificação</ListItemText>
              </MenuItem>
            </MenuList>
            {/* Botton */}
            <MenuList>
              <MenuItem
                sx={{
                  color: textColor,
                  borderRadius: "6px",
                  ":hover": {
                    backgroundColor: primaryColor,
                    color: sideBarColor,
                  },
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>Voltar</ListItemText>
              </MenuItem>

              <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked 
                onClick={colorMode.toggleColorMode} />}
                label={`Modo ${mode}`}
              />
              {/* <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? <DarkMode /> : <LightMode />}
                {theme.palette.mode}
              </IconButton> */}
            </MenuList>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
