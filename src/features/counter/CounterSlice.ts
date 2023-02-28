import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { fetchCounter } from "./counterAPI";

//type
export interface CounterSlice {
    value: number;
    status:'idle' | 'loading' | 'fail';
}

//number khoi dau
const initialState: CounterSlice = {
    value: 0,
    status: 'idle',
}

export const incrementAsync = createAsyncThunk(
    'counter/fetchCount',
    async (amount: number) => {
        const response = await fetchCounter(amount);
        return response.data;
    }
)
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
         },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        }       
    },
    extraReducers: (builder) => {
        builder.addCase(incrementAsync.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(incrementAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value = action.payload;
        });
        builder.addCase(incrementAsync.rejected, (state) => {
            state.status = 'fail';
        });
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;