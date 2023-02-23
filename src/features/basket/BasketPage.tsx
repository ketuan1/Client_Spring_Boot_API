import { AddCircle, Delete, RemoveCircle } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import BasketSummary from './BasketSummary';

function BasketPage() {

  /**
   * code old
    const [basket, setBasket] = useState<Basket | null>(null);
     loading
    const [loading, setLoading] = useState(true);
   useEffect(() => {
         axios.get('baskets')
             .then((response: AxiosResponse) => setBasket(response.data))
             .catch(err => console.log(err))
             .finally(() => setLoading(false));
     }, []);
     if (loading) {
         return <LoadingComponent />
     }
   * 
   */
  
  const { basket, setBasket, removeItem } = useContext(StoreContext);
  const [status, setStatus] = useState({
    loading: false,
    name: ''
  });

  //function
  const handleAddItem = (productId: number, name: string) => {
    setStatus({
      loading: true,
      name: name
    });
    axios.post(`baskets?productId=${productId}&quantity=1`, {})
      .then((response: AxiosResponse) => setBasket(response.data))
      .catch(err => console.error(err))
    .finally(() => setStatus({loading: false, name}));
  }

  const handleRemoveItem = (productId: number, quantity: number, name: string) =>{
    setStatus({
      loading: true,
      name: name
    });
    axios.delete(`baskets?productId=${productId}&quantity=${quantity}`)
      .then(() => removeItem(productId, quantity))
      .catch(err => console.error(err))
      .finally(() => setStatus({loading: false, name}));
  }
  
    if (!basket) {
        return <Typography variant="h3">Basket empty</Typography>
    }
    
    return ( 
        <>
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.basketItems.map((row) => (
            <TableRow
              key={row.productId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">$ {row.unitPrice}</TableCell>

              <TableCell align="center">

                <LoadingButton
                  loading={status.loading && status.name === 'add' + row.productId}
                  color="secondary" onClick={() => handleAddItem(row.productId, 'add' + row.productId)}>
                  <AddCircle />
                </LoadingButton>
                {row.quantity}

                <LoadingButton
                  loading={status.loading && status.name === 'remove' + row.productId}
                  color="error" onClick={() => handleRemoveItem(row.productId, 1, 'remove'+row.productId)}>
                  <RemoveCircle />
                </LoadingButton>
              </TableCell>

              <TableCell align="right">$ {(row.unitPrice*row.quantity).toFixed(2)}</TableCell>
                  <TableCell align="right">
                <LoadingButton loading={status.loading && status.name === 'delete' + row.productId}
                  color="error" onClick={() => handleRemoveItem(row.productId, row.quantity, 'delete'+row.productId)}>
                          <Delete />
                      </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </TableContainer>
        
        <Grid>
        <Grid item xs={6} />
          <Grid item xs={6}/>
          <BasketSummary />
        </Grid>
       
        </>
     );
}

export default BasketPage;