import { useState } from "react";
import { Basket } from "../model/basket";
import { StoreContext } from "./StoreContext";

function StoreProvider(props: any) {
    //basket
    const [basket, setBasket] = useState<Basket | null>(null);

    //function remove Item
    const removeItem = (productId: number, quantity: number) => {
        //check item have exist in basket k, if k exist the bo qua(return)
        if (!basket) {
            return;
        }

        //if have basket....
        const basketItems = [...basket.basketItems];

        //search productId giong nhu input in productId
        const itemIndex = basketItems.findIndex(item => item.productId === productId);

        //if itemIndex exits( > -1)
        if (itemIndex > -1) {
            //if have item the get quantity current - quantity new
            basketItems[itemIndex].quantity -= quantity;

            //if basketItems of itemIndex === 0, this splice(itemIndex, 1)
            if (basketItems[itemIndex].quantity === 0) {
                basketItems.splice(itemIndex, 1);
            }

            //update info basket 
            //previousState is tinh trang truoc of basket, ...previousState sau do update basketItems
            setBasket(previousState => {
                return { ...previousState!, basketItems }
            });
        }
    }
    return ( 
        //component StoreContext
        <StoreContext.Provider value={{
            //Object of basket(StoreContextValue  component)
            //variable: Value
            basket: basket,
             //variable: Function
            setBasket: setBasket,
            removeItem: removeItem,
        }}>

            {props.children}
        </StoreContext.Provider>
     );
}

export default StoreProvider;
