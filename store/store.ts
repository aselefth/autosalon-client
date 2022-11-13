import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {AppSlice} from './AppSlice';
import { CarSlice } from "./CarSlice";
import modalSlice from './ModalSlice';

const store = configureStore({
    reducer: {
        [AppSlice.reducerPath]: AppSlice.reducer,
        [CarSlice.reducerPath]: CarSlice.reducer,
        modalSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AppSlice.middleware).concat(CarSlice.middleware)
})

export default store;
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch;