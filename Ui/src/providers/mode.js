import { createContext, useContext, useState, useMemo } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { amber, deepOrange, grey, blue, common } from "@mui/material/colors";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const palette = {
    light: {
      background: {
        sideBar: grey[50],
      },
    },
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  sideBar: grey[50],
                },
              }
            : {
                background: {
                  sideBar: grey[900],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
