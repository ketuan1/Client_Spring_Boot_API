import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { BasketItem } from "../../model/basket";

function BasketSummary() {
    //context
   // const { basket } = useContext(StoreContext);
    
    //redux
    const {basket} = useSelector((state: any) => state.basket)

    //method subtotal
    // case 1: check basket have, have not, if have the get basketItems.reduce((sum, item)) -> reducer(return value only)
    //case 2: if not have value the return 0
    const subtotal = basket ? basket.basketItems.reduce((sum: number, item: BasketItem) => sum + (item.quantity * item.unitPrice), 0) : 0;

    //method delivery Fee
    //subtotal > 100 the free, and duoi 100$ thi add them 5$
    const deliveryFee = subtotal > 100 ? 0 : 5;

    return ( 
        <TableContainer component={Paper} variant='outlined'>
            <Table>
                <TableBody>
                    <TableRow>
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell>$ {subtotal.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={2}>Delivery Free</TableCell>
                    <TableCell>$ {deliveryFee.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell>$ {(subtotal + deliveryFee).toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <span style={{ fontSize: 'italic' }}>
                           ** Orders over $100 will be qualified for free delivery
                        </span>
                    </TableRow>
                </TableBody>
            </Table>
            
        </TableContainer>
     );
}

export default BasketSummary;