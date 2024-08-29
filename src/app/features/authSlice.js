import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: {},
    accessToken: "",
    refreshToken: "",
    loading: false,
    error: false,
}



const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        fetchAuthStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        fetchAuthFail:(state)=>{
            state.loading = false;
            state.error = true;
        },
        fetchAuthLoginSuccess:(state,{payload})=>{
            state.loading = false;
            state.user = payload?.user;
            state.accessToken = payload?.bearer?.accessToken;
            state.refreshToken = payload?.bearer?.refreshToken;

        },
        fetchAuthRegisterSuccess:(state,{payload})=>{
            state.loading = false;
            state.user = payload?.data;
            state.accessToken = payload?.bearer?.accessToken;
            state.refreshToken = payload?.bearer?.refreshToken;

        },
        fetchAuthLogout:(state)=>{
            state.loading = false;
            state.user = {};
            state.accessToken = "";
            state.refreshToken = "";

        },
        refreshTokenSuccess : (state,{payload}) => {
            state.loading = false; 
            state.token = payload; 
        },
        // logoutSuccess : (state) => {
        //     state.loading = false;
        //     state.user = {};
        //     state.accessToken = null;
        //     state.refreshToken = null;
        // },
    }
})


export const {fetchAuthStart, fetchAuthFail, fetchAuthLoginSuccess, fetchAuthLogout,fetchAuthRegisterSuccess, refreshTokenSuccess,} = authSlice.actions;
export default authSlice.reducer;