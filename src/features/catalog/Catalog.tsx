import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import LoadingComponent from "../../layout/Loading";
import { Product } from "../../model/product";
import ProductList from "./ProductList";


//http://localhost:8080/api/file/image/${product.imageUrl}

function Catalog() {

  const [products, setProducts] = useState<Product[]>([]);

  //loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //fetch js core
    // fetch("http://localhost:8080/api/products")
    //   .then((response) => response.json())
    //   .then((data) => setProducts(data));
    
    //axios fetch API
    axios.get("products")
      .then((response: AxiosResponse) => setProducts(response.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingComponent />
  }
  
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default Catalog;
