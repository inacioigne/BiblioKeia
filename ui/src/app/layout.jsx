"use client";
import "./globals.css";
// MUI Styles
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Providers
import { ProgressProvider } from "src/providers/progress";
import { ModeProvider } from "src/providers/mode";
import { BfProvider } from "src/providers/bibframe";
import { AlertProvider } from "src/providers/alerts";

import Providers from "src/app/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <ProgressProvider>
        <ModeProvider>
          <BfProvider>
            <AlertProvider>
              <body>
                <Providers />
                {children} 
              </body>
            </AlertProvider>
          </BfProvider>
        </ModeProvider>
      </ProgressProvider>
    </html>
  );
}
