import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
// import { useNavigate } from "react-router-dom"; 
import { toastError, toastSuccess } from "../helpers/toastify";
import { fetchCommentFail, fetchCommentOfBlog, fetchCommentStart, fetchCommentSuccess, fetchCommentSuccessWithoutPayload } from "../app/features/commentSlice";


const useCommentServices = () => {
  const { axiosToken, axiosPublic} = useAxios();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getCommentsApi = async (filters = "") => {
    const endPoint = "/comments?limit=100000";

    dispatch(fetchCommentStart());
    try {
      const response = await axiosPublic(endPoint );
      console.log("comments response =", response);
      const data = response?.data;
      dispatch(fetchCommentSuccess(data?.data));
 

      //warnings
      // toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCommentFail());
      toastError(error?.response?.data?.message);
      console.log("comments get api error:", error);
    }
  };



  /**
   * Fetches comments of a specific blog post from the server.
   * @param {number} id - The ID of the blog post to fetch comments for.
   * @returns None 
   */
  const getCommentsOfBlog = async (id) => {
    const endPoint = "/comments/ofBlog/"+id;

    dispatch(fetchCommentStart());
    try {
      const response = await axiosToken.get(endPoint );
      console.log("comments of a blog response =", response);
      const data = response?.data;
      dispatch(fetchCommentOfBlog(data?.data));
 

      //warnings
      // toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCommentFail());
      toastError(error?.response?.data?.message);
      console.log("comments of a blog api error:", error);
    }
  };



  /**
   * Makes a POST request to the comment API with the provided payload.
   * @param {Object} payload - {blogId, commment}
   * @returns None
   */
  const postCommentApi = async (payload) => {
    const endPoint = "/comments";

    dispatch(fetchCommentStart());
    try {
      const response = await axiosToken.post(endPoint,payload );
      console.log("post Comment response =", response);
      const data = response?.data;
      dispatch(fetchCommentSuccessWithoutPayload());
      
      //getComments APi =>
      getCommentsOfBlog(payload.blogId)
      getCommentsApi();

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCommentFail());
      toastError(error?.response?.data?.message);
      console.log("post Comment api error:", error);
    }
  };


  const deleteCommentApi = async (id,blogId) => {
    const endPoint = "/comments/"+id;

    dispatch(fetchCommentStart());
    try {
      const response = await axiosToken.delete(endPoint );
      console.log("delete comment api response =", response);
      const data = response?.data;
      dispatch(fetchCommentSuccessWithoutPayload());
 

      //getComments APi =>
      getCommentsOfBlog(blogId)
      getCommentsApi();


      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCommentFail());
      toastError(error?.response?.data?.message);
      console.log("delete comment api error:", error);
    }
  };




  return { getCommentsApi,getCommentsOfBlog, postCommentApi, deleteCommentApi,   };
};

export default useCommentServices;
