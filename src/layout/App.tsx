import "./App.css";
import Catalog from "../features/catalog/Catalog";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./Header";
import { useContext, useEffect, useState } from "react";
import HomePage from "../features/home/HomePage";
import AboutPage from "../features/about/AboutPage";
import Contact from "../features/contact/Contact";
import Uploader from "../features/upload/uploader";
import { Route, Routes } from 'react-router-dom';
import ProductDetail from "../features/catalog/ProductDetail";
import { ToastContainer } from "react-toastify";
import AxiosInterceptor from "../interceptor/AxiosInterceptor";
import NotFound from "../features/error/NotFound";
import BasketPage from "../features/basket/BasketPage";
import { getCookie } from "../features/util/util";
import axios, { AxiosResponse } from "axios";
import { StoreContext } from "../context/StoreContext";
import LoadingComponent from "./Loading";
import CheckoutPage from "../features/checkout/CheckoutPage";
import { setBasketReducer } from "../features/basket/BasketSlice";
import { store } from "../store";

function App() {

  //store context
  const {setBasket} = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

  const [darkMore, setDarkMore] = useState(false);
  const paletteType = darkMore ? 'dark' : 'light';

  const theme = createTheme({
    palette: { mode: paletteType }
  });

  //get info into basket(API)
  useEffect(() => {
    //get cookie of buyerId
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      setLoading(true)
      axios.get('baskets')
        .then((response: AxiosResponse) => {
          //code old
         // setBasket(response.data);
          store.dispatch(setBasketReducer(response.data))
        console.log(response.data);
        }).catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [setBasket])

  if (loading) {
    return <LoadingComponent />
  }


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
              <Route path='basket' element={<BasketPage />} />
              <Route path='checkout' element={<CheckoutPage />} />
              <Route path='*' element={<NotFound />} />

              </Routes>
              </Container>
          </AxiosInterceptor>
      </ThemeProvider>
      
    </>
  );
}

export default App;
