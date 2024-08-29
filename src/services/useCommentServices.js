import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
// import { useNavigate } from "react-router-dom"; 
import { toastError, toastSuccess } from "../helpers/toastify";
import { fetchCommentFail, fetchCommentOfBlog, fetchCommentStart, fetchCommentSuccess } from "../app/features/commentSlice";


const useCommentServices = () => {
  const { axiosToken, axiosPublic} = useAxios();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getCommentsApi = async (filters = "") => {
    const endPoint = "/comments";

    dispatch(fetchCommentStart());
    try {
      const response = await axiosPublic(endPoint );
      console.log("comments response =", response);
      const data = response?.data;
      dispatch(fetchCommentSuccess(data?.data));
 

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCommentFail());
      toastError(error?.response?.data?.message);
      console.log("comments get api error:", error);
    }
  };



  const getComentsOfBlog = async (id) => {
    const endPoint = "/comments/ofBlog/"+id;

    dispatch(fetchCommentStart());
    try {
      const response = await axiosToken.get(endPoint );
      console.log("comments of a blog response =", response);
      const data = response?.data;
      dispatch(fetchCommentOfBlog(data?.data));
 

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCommentFail());
      toastError(error?.response?.data?.message);
      console.log("comments of a blog api error:", error);
    }
  };

  return { getCommentsApi,getComentsOfBlog  };
};

export default useCommentServices;
