import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../src/features/counter/CounterSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
});