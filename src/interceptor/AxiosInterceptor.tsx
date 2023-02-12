import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function AxiosInterceptor(props: any) {
      //chuyen page -> use Hook useNavigate()
      const navigate = useNavigate();
      const sleep = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

  useEffect(() => {

       // async function interceptorToCheckError() {
          const interceptor = axios.interceptors.response.use(async response => {
          //  await sleep(100);
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
                  
                  case 404:
                    navigate('/not-found')
                    break;
              
                  default:
                    toast.error(error.response?.data.message, {theme: "dark"});
                    break;
                }
                return Promise.reject(error.response);
            });
    
            return () => {
                axios.interceptors.response.eject(interceptor);
            }
      //  }

       // interceptorToCheckError();
    }, [navigate]);

    return props.children;
}

export default AxiosInterceptor;