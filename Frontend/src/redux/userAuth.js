import { createSlice } from "@reduxjs/toolkit";

const INITTAL_STATE = {
    user: {},
    token: null,
    success: false,
}
const authSlice = createSlice({
    name: "auth",
    initialState: INITTAL_STATE,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.success = true
        },
        logout(state, action) {
            state.success = false
            state.token = null
            state.user = {}
        },
        UpdateData: (state, action) => {
            state.user.name = action.payload.username;
            state.user.email = action.payload.email;
            state.user.phoneNumber = action.payload.phone;
            state.user.image = action.payload.image;
        }

    },
});

export const { setUser, logout, UpdateData } = authSlice.actions;
export default authSlice.reducer;