import {List} from "@mui/material";
import { Product } from "../../model/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

function ProductList(props: Props) {
  return (
    <List>
      {props.products.map((product, index) => {
        return (
            <ProductCard key={product.id} product={product}/>
        );
      })}
    </List>
  );
}

export default ProductList;
