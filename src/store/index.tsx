import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { apiSlice } from "./services/apiSlice";

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
