import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import userSlice from "./user/userSlice";

export const store = configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
        user: userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    devTools: true,
})