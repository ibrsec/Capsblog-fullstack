import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  oneBlog: {},
  likes: {}, //{blogId: ['userId',userid]}
  blogQueries: {
    pagination: {},
    filters: {
      categoryId: "", 
    },
    searchs: {
      title: "",
    },
  },
  myBlogQueries: {
    pagination: {},
    filters: {
      categoryId: "", 
    },
    searchs: {
      title: "",
    },
  },
  loading: false,
  error: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    fetchBlogStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchBlogFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchBlogSuccess: (state, { payload }) => {
      // [blogs]
      state.loading = false;
      state.blogs = payload;
      payload.forEach((blog) => {
        //{blog}
        state.likes[blog?._id] = [...blog?.likes];
      });
    },
    fetchBlogOneSuccess: (state, { payload }) => {
      // {...blog}
      state.loading = false;
      state.oneBlog = payload;
    },
    fetchBlogPostLike: (state, { payload }) => {
      //response.data
      state.loading = false;
      state.likes[payload?.data?._id] = [...payload?.data?.likes];
    },
    fetchBlogLogout: (state) => {
      state.blogs = [];
      state.oneBlog = {}
      state.likes = {}
      state.blogQueries = {};
      state.myBlogQueries = {};
    },
    fetchBlogSuccessWithoutPayload: (state) => {
      state.loading = false;
    },
    setPagination: (state, { payload }) => {
      state.blogQueries.pagination = payload;
    },
    setCategoryFilter: (state, action) => {
      if (!state.blogQueries.filters) {
        state.blogQueries.filters = { categoryId: "" }; // Eğer state.filters undefined ise, başlatıyoruz
      }
      state.blogQueries.filters.categoryId = action.payload;
    },
    setTitleSearch: (state, action) => {
      if (!state.blogQueries.searchs) {
        state.blogQueries.searchs = { title: "" }; // Eğer state.filters undefined ise, başlatıyoruz
      }
      state.blogQueries.searchs.title = action.payload;
    },
    setMyBlogPagination: (state, { payload }) => {
      state.myBlogQueries.pagination = payload;
    },
    setMyBlogCategoryFilter: (state, action) => {
      if (!state.myBlogQueries.filters) {
        state.myBlogQueries.filters = { categoryId: "" }; // Eğer state.filters undefined ise, başlatıyoruz
      }
      state.myBlogQueries.filters.categoryId = action.payload;
    },
    setMyBlogTitleSearch: (state, action) => {
      if (!state.myBlogQueries.searchs) {
        state.myBlogQueries.searchs = { title: "" }; // Eğer state.filters undefined ise, başlatıyoruz
      }
      state.myBlogQueries.searchs.title = action.payload;
    },
  },
});

export const {
  fetchBlogStart,
  fetchBlogFail,
  fetchBlogSuccess,
  fetchBlogOneSuccess,
  fetchBlogLogout,
  fetchBlogPostLike,
  fetchBlogSuccessWithoutPayload,
  setPagination,
  setCategoryFilter,
  setTitleSearch,
  setMyBlogPagination,
  setMyBlogCategoryFilter,
  setMyBlogTitleSearch,
} = blogSlice.actions;
export default blogSlice.reducer;
