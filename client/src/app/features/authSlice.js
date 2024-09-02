import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    user: {},
    users:[],
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
        fetchUsersSuccess:(state,{payload})=>{
            state.loading = false;
            state.users = payload; 

        },
        fetchAuthSuccessWithoutPayload:(state)=>{
            state.loading = false; 

        },
        fetchAuthLogout:(state)=>{
            state.loading = false;
            state.user = {};
            state.users = [];
            state.accessToken = "";
            state.refreshToken = "";

        },
        refreshTokenSuccess : (state,{payload}) => {
            state.loading = false; 
            state.accessToken = payload; 
        },
        // logoutSuccess : (state) => {
        //     state.loading = false;
        //     state.user = {};
        //     state.accessToken = null;
        //     state.refreshToken = null;
        // },
    }
})


export const {fetchAuthStart, fetchAuthFail, fetchAuthLoginSuccess, fetchAuthLogout,fetchAuthRegisterSuccess, refreshTokenSuccess, fetchAuthSuccessWithoutPayload, fetchUsersSuccess} = authSlice.actions;
export default authSlice.reducer;