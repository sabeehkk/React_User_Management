import { createSlice } from "@reduxjs/toolkit";

const INITTAL_STATE ={
    admin: {},
    token: null,
    success: false,
}

const adminAuthSlice = createSlice({
    name:'adminAuth',
    initialState: INITTAL_STATE,
    reducers:{
        setAdmin: (state, action)=>{
            state.admin = action.payload.admin;
            state.token = action.payload.token;
            state.success = true;
        },
        logout: (state, action)=>{
            console.log('logout')
            state.admin = {};
            state.token = null;
            state.success = false;
        }
    }
})

export const { setAdmin, logout} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;