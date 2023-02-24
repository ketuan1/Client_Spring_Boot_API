import { LoadingButton } from "@mui/lab";
import { Button, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import LoadingComponent from "../../layout/Loading";
import { Product } from "../../model/product";

function ProductDetail() {
    //HOOK useParam
    let params = useParams();

    const { basket, setBasket, removeItem } = useContext(StoreContext);

    const [product, setProduct] = useState<Product | null>(null);
    //loading network
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const basketItem = basket?.basketItems.find(item => item.productId === product?.id);
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    //axios
    useEffect(() => {
        axios.get(`products/${params.productId}`)
            .then(response => {
                setProduct(response.data);

                if (basketItem) {
                    setQuantity(basketItem.quantity);
                }
            }).catch(error => console.log(error))
                .finally(() => setLoading(false));
    }, [params.productId]);

    //
    const handleInputChange = (event: any) => {
        if (event.target.value >= 0) {
            setQuantity(+event.target.value);
        }
    }

    //
    const handleUpdateCart = () => {
        setSubmitting(true);
        if (!basketItem || quantity > basketItem?.quantity) {
            const updatedQuantity = basketItem ? - quantity - basketItem.quantity : quantity;
            axios.post(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`, {})
                .then((response: AxiosResponse) => setBasket(response.data))
                .catch((err => console.log(err)))
                .finally(() => setSubmitting(false));
        }else{
            const updatedQuantity = basketItem.quantity - quantity;
            axios.delete(`baskets?productId=${product?.id}&quantity=${updatedQuantity}`)
                .then((response: AxiosResponse) => setBasket(response.data))
                .catch((err => console.error(err)))
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
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        onChange={handleInputChange}
                        variant="outlined"
                        type="number"
                        label="Quantity in Car"
                        fullWidth
                        value={quantity}
                    />
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={basketItem?.quantity === quantity || (!basketItem && quantity === 0)}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
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