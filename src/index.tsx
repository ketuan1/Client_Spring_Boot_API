import axios, { AxiosError} from 'axios';
import { log } from 'console';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './layout/App';
import reportWebVitals from './reportWebVitals';

//SETTING URL for API
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(response => {
  return response;
}, (error: AxiosError) => {
  console.log('interceptor run to get error msg');
  return Promise.reject(error);
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
