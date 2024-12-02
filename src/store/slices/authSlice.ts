import { createSlice } from "@reduxjs/toolkit";

const IS_AUTHENTICATED_KEY = '@goledger-challenge-web:is_authenticated'
const IS_AUTHENTICATED_VALUE = localStorage.getItem(IS_AUTHENTICATED_KEY)

export const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: IS_AUTHENTICATED_VALUE ? JSON.parse(IS_AUTHENTICATED_VALUE) : false },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true
      localStorage.setItem(IS_AUTHENTICATED_KEY, JSON.stringify(true))
    },

    logout: (state) => {
      state.isAuthenticated = false
      localStorage.setItem(IS_AUTHENTICATED_KEY, JSON.stringify(false))
    },
  }
});

export const { login, logout } = authSlice.actions