import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../features/auth/authSlice"
import eventsReducer from "../features/event/eventsSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({

    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        events: eventsReducer,

    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)