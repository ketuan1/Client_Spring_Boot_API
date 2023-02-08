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
import ProductDetail from "../features/catalog/ProductDetail";
import { ToastContainer } from "react-toastify";
import AxiosInterceptor from "../interceptor/AxiosInterceptor";
import NotFound from "../features/error/NotFound";

function App() {

  const [darkMore, setDarkMore] = useState(false);
  const paletteType = darkMore ? 'dark' : 'light';

  const theme = createTheme({
    palette: { mode: paletteType }
  });


  return (
    <>
      <ThemeProvider theme={theme}>
        <AxiosInterceptor>

            <ToastContainer position="bottom-right" hideProgressBar />

          <CssBaseline />
          <Header onSetDarkMore={setDarkMore} darkMore={darkMore} />
            <Container>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='catalog' element={<Catalog />} />
                <Route path='catalog/:productId' element={<ProductDetail />} />
                <Route path='about' element={<AboutPage />} />
                <Route path='contact' element={<Contact />} />
              <Route path='upload' element={<Uploader />} />
              <Route path='not-found' element={<NotFound />} />

              </Routes>
              </Container>
          </AxiosInterceptor>
      </ThemeProvider>
      
    </>
  );
}

export default App;
