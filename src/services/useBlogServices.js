import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../helpers/toastify";

import {
  fetchBlogFail,
  fetchBlogOneSuccess,
  fetchBlogPostLike,
  fetchBlogStart,
  fetchBlogSuccess,
  fetchBlogSuccessWithoutPayload,
  setMyBlogPagination,
  setPagination,
} from "../app/features/blogSlice";
import { generateQuery } from "../helpers/generateQuery";

const useBlogServices = () => {
  const { axiosToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { filters, searchs, pagination } = useSelector((state) => state.blog.myBlogQueries);
  

  const getBlogsApi = async (filters = "") => {
    const endPoint = "/blogs?" + filters;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosPublic(endPoint);
      console.log("blogs response =", response);
      const data = response?.data;
      dispatch(fetchBlogSuccess(data?.data));
      dispatch(setPagination(data?.details));

      //warnings
      // toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("blogs get api error:", error);
    }
  };

  const getBlogsofUserApi = async (query = "") => {
    const endPoint = "/blogs/of/user?" + query;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken(endPoint);
      console.log("blogs of the user response =", response);
      const data = response?.data;
      dispatch(fetchBlogSuccess(data?.data));
      dispatch(setMyBlogPagination(data?.details));

      //warnings
      // toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("blogs of the users api error:", error);
    }
  };

  const getOneBlogApi = async (id) => {
    const endPoint = "/blogs/" + id;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken(endPoint);
      console.log("one blog response =", response);
      const data = response?.data;
      dispatch(fetchBlogOneSuccess(data?.data));

      //warnings
      // toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("one blog get api error:", error);
    }
  };

  const toggleLikeOfBlogApi = async (id) => {
    const endPoint = "/blogs/" + id + "/postLike";

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken.post(endPoint);
      console.log("toggle like of a blog response =", response);
      const data = response?.data;
      dispatch(fetchBlogPostLike(data));

      //warnings
      // toastSuccess(data?.message);
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

  const deleteBlogApi = async (id) => {
    const endPoint = "/blogs/" + id;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken.delete(endPoint);
      console.log("delete blog response =", response);
      const data = response?.data;
      dispatch(fetchBlogSuccessWithoutPayload());

      //warnings
      toastSuccess(data?.message || "Blog is deleted!");

      //navigate
      navigate(-1);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("delete blog api error:", error);
    }
  };

  const putUpdateBlogApi = async (id, payload) => {
    const endPoint = "/blogs/" + id;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken.put(endPoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("put update edit blog response =", response);
      dispatch(fetchBlogSuccessWithoutPayload());

      //warnings
      toastSuccess(response?.data?.message);
      getOneBlogApi(id);
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("put update edit blog error:", error);
    }
  };
  const publishBlogToggleApi = async (id, newPublishStatus) => {
    const endPoint = "/blogs/" + id;

    dispatch(fetchBlogStart());
    try {
      const response = await axiosToken.patch(endPoint, {isPublish:newPublishStatus});
      console.log("publish blog toggle response =", response);
      dispatch(fetchBlogSuccessWithoutPayload());

      //warnings
      toastSuccess(response?.data?.message);



      if(location.pathname ==='/myblogs'){
        let queryString = generateQuery({ filters, searchs, pagination }); 
        getBlogsofUserApi(queryString+"&sort[isPublish]=desc");
      }else if(location.pathname.startsWith('/blogDetails')){
        getOneBlogApi(id);

      }

 
 
    } catch (error) {
      dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("publish blog toggle error:", error);
    }
  };

  return {
    getBlogsApi,
    getBlogsofUserApi,
    getOneBlogApi,
    toggleLikeOfBlogApi,
    postNewBlogApi,
    deleteBlogApi,
    putUpdateBlogApi,publishBlogToggleApi
  };
};

export default useBlogServices;
