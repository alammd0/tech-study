import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    isAuthenticated: false,
    Loading : false,
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null
}

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setUser : (state, action) =>{
            state.user = action.payload,
            state.isAuthenticated = true;
        },

        setloading : (state, action) => {
            state.Loading = action.payload;
        },

        setToken : (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                localStorage.setItem("token", action.payload);
            } else {
                localStorage.removeItem("token");
            }
        }
    }
})

export const { setUser, setloading, setToken } = authSlice.actions;
export default authSlice.reducer;