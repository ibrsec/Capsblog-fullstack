import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    blogs: [],
    oneBlog: {},
    likes: {}, //{blogId: ['userId',userid]}
    loading: false,
    error: false,
}



const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        fetchBlogStart:(state)=>{
            state.loading = true;
            state.error = false;
        },
        fetchBlogFail:(state)=>{
            state.loading = false;
            state.error = true;
        },
        fetchBlogSuccess:(state,{payload})=>{ // [blogs]
            state.loading = false;
            state.blogs = payload; 
            payload.forEach(blog=> { //{blog}
                state.likes[blog?._id] = [...blog?.likes];
            } )
        }, 
        fetchBlogOneSuccess:(state,{payload})=>{ // {...blog}
            state.loading = false;
            state.oneBlog = payload; 
            
        }, 
        fetchBlogPostLike:(state,{payload})=> {//response.data
            state.loading = false;
            state.likes[payload?.data?._id] = [...payload?.data?.likes];
        }, 
        fetchBlogLogout:(state)=>{
            state.blogs = []; 

        },
        fetchBlogSuccessWithoutPayload:(state)=>{
            state.loading = false; 

        },
    }
})


export const {fetchBlogStart, fetchBlogFail, fetchBlogSuccess, fetchBlogOneSuccess, fetchBlogLogout,fetchBlogPostLike, fetchBlogSuccessWithoutPayload} = blogSlice.actions;
export default blogSlice.reducer;