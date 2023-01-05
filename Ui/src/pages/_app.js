import "../styles/globals.css";
import { SearchProvider } from "src/providers/search";
import { AuthProvider } from "src/admin/auth/authContext";
import { BfProvider } from "src/providers/bibframe";
import { AlertProvider } from "src/providers/alerts";
import { ColorModeProvider } from "src/providers/mode"
import { useState, createContext, useContext } from "react";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { grey, deepPurple, indigo } from "@mui/material/colors";

//const ColorModeContext = createContext({ toggleColorMode: () => {} });

function MyApp({ Component, pageProps }) {


  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AuthProvider>
      <SearchProvider>
        <BfProvider>
          <AlertProvider>
          <ColorModeProvider>
              {/* <ThemeProvider theme={theme}> */}
                <Component {...pageProps} />
              {/* </ThemeProvider> */}
              </ColorModeProvider>
          </AlertProvider>
        </BfProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default MyApp;
