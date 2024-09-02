import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    emails: [],
    loading: false,
    error: false,
}



const emailSlice = createSlice({
    name:'emails',
    initialState,
    reducers:{
        fetchEmailStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        fetchEmailFail:(state)=>{
            state.loading = false;
            state.error = true;
        },
        fetchEmailSuccess:(state,{payload})=>{
            state.loading = false;
            state.emails = payload; 
        }, 
        fetchEmailSuccessWithOutPayload:(state)=>{
            state.loading = false;  
        }, 
        fetchEmailLogout:(state)=>{
            state.emails = []; 

        },
    }
})


export const {fetchEmailStart, fetchEmailFail, fetchEmailSuccess, fetchEmailSuccessWithOutPayload, fetchEmailLogout,} = emailSlice.actions;
export default emailSlice.reducer;