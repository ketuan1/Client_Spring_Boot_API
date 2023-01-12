import { Product } from "../../model/product";
import ProductList from "./ProductList";

interface Props {
  products: Product[],
  onAddProduct: () => void;
}

//http://localhost:8080/api/file/image/${product.imageUrl}

function Catalog(props: Props) {
  return (
    <>
      <button onClick={props.onAddProduct}>Add Products</button>
      <ProductList products={props.products} />
    </>
  );
}

export default Catalog;
