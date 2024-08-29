import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    categories: [],
    loading: false,
    error: false,
}



const categorySlice = createSlice({
    name:'category',
    initialState,
    reducers:{
        fetchCategoryStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        fetchCategoryFail:(state)=>{
            state.loading = false;
            state.error = true;
        },
        fetchCategorySuccess:(state,{payload})=>{
            state.loading = false;
            state.categories = payload; 
        }, 
        fetchCategoryLogout:(state)=>{
            state.categories = []; 

        },
    }
})


export const {fetchCategoryStart, fetchCategoryFail, fetchCategorySuccess, fetchCategoryLogout,} = categorySlice.actions;
export default categorySlice.reducer;