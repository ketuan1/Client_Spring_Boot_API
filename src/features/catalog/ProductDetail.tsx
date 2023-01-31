import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

function ProductDetail() {
    //HOOK useParam
    let params = useParams();
    return ( 
        <Typography variant="h2">
            Product Detail Page {params.productId}
        </Typography>
     );
}

export default ProductDetail;