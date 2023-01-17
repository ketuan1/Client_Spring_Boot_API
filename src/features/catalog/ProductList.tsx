import { Grid} from "@mui/material";
import { Product } from "../../model/product";
import ProductCard from "./ProductCard";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface Props {
  products: Product[];
}

function ProductList(props: Props) {
  return (
    <Grid container spacing={2}>
      {props.products.map((product, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ProductCard key={product.id} product={product} />
            </Grid>
         );
       })}     
    </Grid>
  );
}

export default ProductList;
