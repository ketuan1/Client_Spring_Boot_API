import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "../model/product";
import Catalog from "../features/catalog/Catalog";


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
    <div className="app">
      <h1>My Shops</h1>
      <Catalog products={products} onAddProduct={addProduct} />
    </div>
  );
}

export default App;
