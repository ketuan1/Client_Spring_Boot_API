import axios, { AxiosError} from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './layout/App';
import reportWebVitals from './reportWebVitals';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from './context/StoreProvide';
import { Provider } from 'react-redux';
import { store } from './store';

//SETTING URL for API
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
//SETTING axios tuong tac vs cookie
axios.defaults.withCredentials = true;


axios.interceptors.response.use(response => {
  return response;
}, (error: AxiosError<any>) => {
  console.log('interceptor run to get error msg');
  switch (error.response?.status) {
    case 400:
      
      if (error.response?.data.message) {
      const errors = error.response?.data.message.split('; ').filter((message: string) => message !== '');
        throw errors;
    }
      toast.error(error.response?.data.message, {theme: "colored"});
      break;
    default:
      toast.error(error.response?.data.message, {theme: "dark"});
  }
  return Promise.reject(error);
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <StoreProvider>
      <App />
      </StoreProvider>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
