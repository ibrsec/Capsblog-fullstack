import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
// import { useNavigate } from "react-router-dom"; 
import { toastError, toastSuccess } from "../helpers/toastify";

import { fetchBlogFail, fetchBlogOneSuccess, fetchBlogPostLike, fetchBlogStart, fetchBlogSuccess, fetchBlogSuccessWithoutPayload } from "../app/features/blogSlice";

const useBlogServices = () => {
  const { axiosToken, axiosPublic} = useAxios();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getBlogsApi = async (filters = "") => {
    const endPoint = "/blogs?"+filters;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosPublic(endPoint );
      console.log("blogs response =", response);
      const data = response?.data;
      dispatch(fetchBlogSuccess(data?.data));
 

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("blogs get api error:", error);
    }
  };

  const getOneBlogApi = async (id) => {
    const endPoint = "/blogs/"+ id;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken(endPoint );
      console.log("one blog response =", response);
      const data = response?.data;
      dispatch(fetchBlogOneSuccess(data?.data));
 

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("one blog get api error:", error);
    }
  };



  const toggleLikeOfBlogApi = async (id) => {
    const endPoint = "/blogs/"+id+"/postLike";

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken.post(endPoint );
      console.log("toggle like of a blog response =", response);
      const data = response?.data;
      dispatch(fetchBlogPostLike(data));
 

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("blogs like toggle api error:", error);
    }
  };

  const postNewBlogApi = async (payload) => {
    const endPoint = "/blogs";

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken.post(endPoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("post new blog response =", response);
      dispatch(fetchBlogSuccessWithoutPayload());


      //warnings
      toastSuccess(response?.data?.message);
      getBlogsApi("filter[isPublish]=1");
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("post new blog error:", error);
    }
  };

  return { getBlogsApi, getOneBlogApi, toggleLikeOfBlogApi, postNewBlogApi  };
};

export default useBlogServices;
