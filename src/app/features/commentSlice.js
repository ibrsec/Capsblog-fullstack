import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [], //[comments]
  commentsOfBlog: [], // [comments of a blog]
  loading: false,
  error: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    fetchCommentStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchCommentFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    fetchCommentSuccess: (state, { payload }) => {
      // [comments]
      state.loading = false;
      state.comments = payload;
    },
    fetchCommentSuccessWithoutPayload: (state) => {
      // [comments]
      state.loading = false;
    },
    fetchCommentOfBlog: (state, { payload }) => {
      //[comments of a blog]
      state.loading = false;
      state.commentsOfBlog = payload;
    },
    fetchCommentLogout: (state) => {
      state.comments = [];
      state.commentsOfBlog = [];
    },
  },
});

export const {
  fetchCommentStart,
  fetchCommentFail,
  fetchCommentSuccess,
  fetchCommentLogout,
  fetchCommentOfBlog,
  fetchCommentSuccessWithoutPayload,
} = commentSlice.actions;
export default commentSlice.reducer;
