import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
import adminAuthReducer from './slices/adminAuthSlice.js';
import { apiSlice } from "./slices/apiSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminAuth: adminAuthReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        // Add reducer for admin API slice if needed
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    // Optionally enable Redux DevTools only in development mode
    // devTools: process.env.NODE_ENV !== 'production'
});

export default store;
