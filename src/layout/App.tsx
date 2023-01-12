import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "../model/product";
import Catalog from "../features/catalog/Catalog";
import { Typography } from "@mui/material";


function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  //function add Products
  const addProduct = () => {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 1,
        name: "product" + (prevState.length + 1),
        description: "desc product" + (prevState.length + 1),
        unitPrice: 11.11 * (prevState.length + 1),
        imageUrl: 'NONE',
        brand: 'NA',
        unitsInStock: 100,
        category: 'unknown'
      }
    ]);
    console.log(products);
  };

  return (
    <>
      <Typography variant="h3">My Shops</Typography>
      <Catalog products={products} onAddProduct={addProduct} />
    </>
  );
}

export default App;
