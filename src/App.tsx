import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { Router } from "./Router";
import { GlobalStyle } from "./global";
import { CycleContextProvider } from "./contexts/CyclesContext";

export function App() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <CycleContextProvider>
            <Router />
          </CycleContextProvider>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </>
  )
}