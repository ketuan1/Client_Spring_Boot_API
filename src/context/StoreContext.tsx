import { createContext } from "react";
import { Basket } from "../model/basket";

interface StoreContextValue {
    //storage info Basket
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue>({
    //khoi tao value
    basket: null,
    setBasket: (basket: Basket) => { },
    removeItem: (productId: number, quantity: number) => { },
});