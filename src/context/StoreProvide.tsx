import { useState } from "react";
import { Basket } from "../model/basket";
import { StoreContext } from "./StoreContext";

function StoreProvider(props: any) {
    //basket
    const [basket, setBasket] = useState<Basket | null>(null);

    //function remove Item
    const removeItem = (productId: number, quantity: number) => {
        if (!basket) {
            return;
        }

        const basketItems = [...basket.basketItems];

        //search productId giong nhu input in productId
        const itemIndex = basketItems.findIndex(item => item.productId === productId);

        //if itemIndex exits
        if (itemIndex > -1) {
            basketItems[itemIndex].quantity -= quantity;

            //if basketItems of itemIndex === 0, this splice(itemIndex, 1)
            if (basketItems[itemIndex].quantity === 0) {
                basketItems.splice(itemIndex, 1);
            }

            //update info basket 
            setBasket(previousState => {
                return { ...previousState!, basketItems }
            });
        }
    }
    return ( 
        //component StoreContext
        <StoreContext.Provider value={{
            //Object of basket(StoreContextValue  component)
            basket: basket,
            setBasket: setBasket,
            removeItem: removeItem,
        }}>

            {props.children}
        </StoreContext.Provider>
     );
}

export default StoreProvider;