import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    message: null,
};

const moduleSlice = createSlice({
    name: "module-display",
    initialState: initialState,
    reducers: {
        display(state, action) {
            return {
                status: true,
                message: action.payload.message
            }
        },
        hide(state, action) {
            return {
                status: false,
                message: null
            }
        }
    },
});

const moduleReducer = moduleSlice.reducer;

export const moduleActions = moduleSlice.actions;

export default moduleReducer;
