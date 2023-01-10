import { Product } from "../../model/product";

interface Props {
  products: Product[],
  onAddProduct: () => void;
}


function Catalog(props: Props) {
  return (
    <>
      <button onClick={props.onAddProduct}>Add Products</button>
      <ul>
        {
          props.products.map((product: any, index: any) => {
          return (
            <li key={index}>
              {product.name} - price: {product.unitPrice}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Catalog;
