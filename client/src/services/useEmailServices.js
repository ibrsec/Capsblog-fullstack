import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../helpers/toastify"; 

import { generateQuery } from "../helpers/generateQuery";

const useBlogServices = () => {
  const { axiosToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 
  


  const emailSubscribtionApi = async (payload) => {
    const endPoint = "/emails/subscription";

    // dispatch(fetchBlogStart());
    try {
      const response = await axiosPublic.post(endPoint, payload, );
      console.log("emails subscription response =", response);
      // dispatch(fetchBlogSuccessWithoutPayload());

      //warnings
      toastSuccess(response?.data?.message);
      // getBlogsApi("filter[isPublish]=1");
    } catch (error) {
      // dispatch(fetchBlogFail());
      toastError(error?.response?.data?.message);
      console.log("emails subscription error:", error);
    }
  };


  return {
    emailSubscribtionApi
  };
};

export default useBlogServices;
