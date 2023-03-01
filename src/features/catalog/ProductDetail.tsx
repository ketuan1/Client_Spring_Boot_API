import { LoadingButton } from "@mui/lab";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import LoadingComponent from "../../layout/Loading";
import { BasketItem } from "../../model/basket";
import { Product } from "../../model/product";
import { store } from "../../store";
import { removeItemReducer, setBasketReducer } from "../basket/BasketSlice";

function ProductDetail() {
    //HOOK useParam
    let params = useParams();

    //get info basket (StoreContext)
   // const { basket, setBasket, removeItem } = useContext(StoreContext);
    
    const { basket } = useSelector((state: any) => state.basket);

    const [product, setProduct] = useState<Product | null>(null);
    //loading network
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    //search basketItem in basket have productId === productId product details current
    const basketItem = basket?.basketItems.find((item: BasketItem) => item.productId === product?.id);
    //method quantity of product details current
    const [quantity, setQuantity] = useState(0);
    //method update quantity product
    const [submitting, setSubmitting] = useState(false);

    //axios load product details
    useEffect(() => {
        axios.get(`products/${params.productId}`)
            .then(response => {
                setProduct(response.data);
                //check basketItem !== null the setQuantity(basketItem.quantity)
                if (basketItem) {
                    setQuantity(basketItem.quantity);
                }
            }).catch(error => console.log(error))
                .finally(() => setLoading(false));
    }, [basketItem, params.productId]);

    // function handler change input of quantity
    const handleInputChange = (event: any) => {
        //check value >= 0 tránh trường hợp user nhập số âm vào
        if (event.target.value >= 0) {
            setQuantity(+event.target.value);
        }
    }

    // function handle update Cart
    const handleUpdateCart = () => {
        //set status is true
        setSubmitting(true);
        // method update quantity into basket
        if (!basketItem || quantity > basketItem?.quantity) {
            const updatedQuantity = basketItem?quantity - basketItem.quantity : quantity;
            axios.post(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`, {})
                .then((response: AxiosResponse) => store.dispatch(setBasketReducer(response.data)))
                .catch((err => console.log(err)))
                .finally(() => setSubmitting(false));
        } else {
            // method remove item basket
            const updatedQuantity = basketItem.quantity - quantity;
            axios.delete(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`)
                .then(() => store.dispatch(removeItemReducer({ productId: product?.id!, quantity: updatedQuantity })))
                .catch((err => console.log(err)))
                .finally(() => setSubmitting(false));
        }
    }
    
    if (loading) {
        return <LoadingComponent />
    }

    if (!product)
        return <h3>Product not found</h3>
    
    
    return ( 
        <Grid container spacing={6}>
            <Grid item xs={4}>
                <img src={`${process.env.REACT_APP_BASE_URL}file/image/${product?.imageUrl}`} alt={`$product?.name}`} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={8}>
                <Typography variant="h3">{product?.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color='secondary' sx={{ mb: 4 }}>${product?.unitPrice.toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product?.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>{product?.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Author</TableCell>
                                <TableCell>{product?.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product?.unitsInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {/* input of basket */}
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        onChange={handleInputChange}
                        variant="outlined"
                        type="number"
                        label="Quantity in Car"
                        fullWidth
                        // quantity khi load product len
                        value={quantity}
                    />
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={basketItem?.quantity === quantity || (!basketItem && quantity === 0)}
                            loading={submitting}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {/* check basket item if have value the "update quantity", if not have basket the "add to Cart" */}
                            {basketItem ? 'Updated Quantity' : 'Add to Cart'}

                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>



            <Button onClick={() => navigate(-1)}>GO BACK</Button>
        </Grid>
     );
}

export default ProductDetail;