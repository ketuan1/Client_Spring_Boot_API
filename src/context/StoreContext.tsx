import { createContext } from "react";
import { Basket } from "../model/basket";

interface StoreContextValue {
    //storage info Basket
    basket: Basket | null;
    //add item into basket
    setBasket: (basket: Basket) => void;
    //remove item
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue>({
    //init value
    basket: null,
    setBasket: (basket: Basket) => { },
    removeItem: (productId: number, quantity: number) => { },
});