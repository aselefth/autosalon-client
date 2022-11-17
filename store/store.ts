import { configureStore } from "@reduxjs/toolkit";
import { AppSlice } from "./AppSlice";
import { CarSlice } from "./CarSlice";
import { ClientSlice } from "./ClientSlice";
import { ColorsSlice } from "./ColorSlice";
import modalSlice from "./ModalSlice";
import { PurchaseSlice } from "./PurchaseSlice";

const store = configureStore({
    reducer: {
        [AppSlice.reducerPath]: AppSlice.reducer,
        [CarSlice.reducerPath]: CarSlice.reducer,
        [ClientSlice.reducerPath]: ClientSlice.reducer,
        [ColorsSlice.reducerPath]: ColorsSlice.reducer,
        [PurchaseSlice.reducerPath]: PurchaseSlice.reducer,
        modalSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            AppSlice.middleware,
            CarSlice.middleware,
            ClientSlice.middleware,
            ColorsSlice.middleware,
            PurchaseSlice.middleware
        ),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
