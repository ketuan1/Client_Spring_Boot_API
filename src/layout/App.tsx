import "./App.css";
import Catalog from "../features/catalog/Catalog";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { Container } from "@mui/system";
import { useState } from "react";

function App() {

  const [darkMore, setDarkMore] = useState(false);
  const paletteType = darkMore ? 'dark' : 'light';

  const theme = createTheme({
    palette: { mode: paletteType }
  });


  return (
    <>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onSetDarkMore={setDarkMore} darkMore={darkMore} />
      <Container>
        <Catalog/>
      </Container>
      </ThemeProvider>
      
    </>
  );
}

export default App;
