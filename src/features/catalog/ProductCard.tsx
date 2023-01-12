import {Avatar,ListItem,ListItemAvatar,ListItemText} from "@mui/material";
import { Product } from "../../model/product";


interface Props {
    product: Product;
}

function ProductCard(props: Props) {
    return ( 
        <>
            <ListItem key={props.product.id}>
            <ListItemAvatar>
              <Avatar
                src={`http://localhost:8080/api/file/image/${props.product.imageUrl}`}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText>
            {props.product.name} - price: {props.product.unitPrice}
            </ListItemText>
          </ListItem>
        </>
     );
}

export default ProductCard;