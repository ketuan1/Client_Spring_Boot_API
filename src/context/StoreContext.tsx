import { createContext } from "react";
import { Basket } from "../model/basket";

interface StoreContextValue {
    //storage info Basket
    basket: Basket | null;
    //add item into basket khi nhan dc value -> return void(id not return gi het)
    setBasket: (basket: Basket) => void;
    //remove item
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue>({
    //init value
    basket: null,
    // return 1 function
    setBasket: (basket: Basket) => { },
    // return 1 function
    removeItem: (productId: number, quantity: number) => { },
});