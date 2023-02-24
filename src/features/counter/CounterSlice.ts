import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface CounterSlice {
    value: number;
    status:'idle' | 'loading' | 'fail';
}

const inititalState: CounterSlice = {
    value: 0,
    status: 'idle',
}
export const counterSlice = createSlice({
    name: 'counter',
    inititalState,
    reducers: {
        increment: (state) => {
            state.value += 1;
         }
        decrement: (state) => {
            state.value -= 1;
        }
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }
    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;