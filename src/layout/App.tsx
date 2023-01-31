import "./App.css";
import Catalog from "../features/catalog/Catalog";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { Container } from "@mui/system";
import { useState } from "react";
import HomePage from "../features/home/HomePage";
import AboutPage from "../features/about/AboutPage";
import Contact from "../features/contact/Contact";
import Uploader from "../features/upload/uploader";
import { Route, Routes } from 'react-router-dom';

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
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='catalog' element={<Catalog />} />
            <Route path='catalog/:productId' element={<Catalog />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='contact' element={<Contact />} />
            <Route path='upload' element={<Uploader />} />

          </Routes>
      </Container>
      </ThemeProvider>
      
    </>
  );
}

export default App;
