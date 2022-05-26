import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      console.log(action);
      return {
        isAuthenticated: true,
        username: action.payload.username,
      };
    },
    logout(state, action) {
      return {
        isAuthenticated: false,
        username: null,
      };
    },
  },
});

const authReducer = authSlice.reducer;

export const authActions = authSlice.actions;

export default authReducer;
