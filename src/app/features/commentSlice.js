import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    comments: [], //[comments]
    blogOfComments: [], // [comments of a blog]
    loading: false,
    error: false,
}



const commentSlice = createSlice({
    name:'comment',
    initialState,
    reducers:{
        fetchCommentStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        fetchCommentFail:(state)=>{
            state.loading = false;
            state.error = true;
        },
        fetchCommentSuccess:(state,{payload})=>{ // [comments]
            state.loading = false;
            state.comments = payload; 
        }, 
        fetchCommentOfBlog:(state,{payload})=> {//[comments of a blog]
            state.loading = false;
            state.blogOfComments = payload
        }, 
        fetchCommentLogout:(state)=>{
            state.comments = []; 
            state.blogOfComments = []

        },
    }
})


export const {fetchCommentStart, fetchCommentFail, fetchCommentSuccess, fetchCommentLogout,fetchCommentOfBlog} = commentSlice.actions;
export default commentSlice.reducer;