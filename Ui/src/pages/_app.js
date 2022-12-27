import "../styles/globals.css";
import { SearchProvider } from "src/providers/search";
import { AuthProvider } from "src/admin/auth/authContext";
import { BfProvider } from "src/providers/bibframe";
import { AlertProvider } from "src/providers/alerts";
import { useState, createContext, useContext } from "react";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function MyApp({ Component, pageProps }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AuthProvider>
      <SearchProvider>
        <BfProvider>
          <AlertProvider>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </ColorModeContext.Provider>
          </AlertProvider>
        </BfProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default MyApp;
