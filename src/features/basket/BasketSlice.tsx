import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../model/basket";

export interface BasketState {
    basket: Basket | null;
}

const initialState: BasketState = {
    basket: null,
};

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        setBasketReducer: (state, action) => {
            state.basket = action.payload;
         },
        removeItemReducer: (state, action) => {
            if (!state.basket) {
                //
                return;
            }
    
           // const basketItems = [...state.basket.basketItems];
    
            //search productId giong nhu input in productId
            const itemIndex = state.basket.basketItems.findIndex(item => item.productId === action.payload.productId);
    
            //if itemIndex exits
            if (itemIndex > -1) {   
                state.basket.basketItems[itemIndex].quantity -= action.payload.quantity;
    
                //if basketItems of itemIndex === 0, this splice(itemIndex, 1)
                if (state.basket.basketItems[itemIndex].quantity === 0) {
                    state.basket.basketItems.splice(itemIndex, 1);
                }             
            }
        }
    }
});

export const { setBasketReducer, removeItemReducer } = basketSlice.actions;