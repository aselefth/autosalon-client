import { configureStore } from "@reduxjs/toolkit";
import {AppSlice} from './AppSlice';
import modalSlice from './ModalSlice';

const store = configureStore({
    reducer: {
        [AppSlice.reducerPath]: AppSlice.reducer,
        modalSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AppSlice.middleware)
})

export default store;
export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch;