import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../helpers/toastify"; 

import { generateQuery } from "../helpers/generateQuery";
import { fetchEmailFail, fetchEmailStart, fetchEmailSuccess, fetchEmailSuccessWithOutPayload } from "../app/features/emailSlice";

const useEmailServices = () => {
  const { axiosToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
 
  


  const emailSubscribtionApi = async (payload) => {
    const endPoint = "/emails/subscription";

    dispatch(fetchEmailStart());
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

  const getEmailsApi = async () => {
    const endPoint = "/emails?limit=1000";

    dispatch(fetchEmailStart());
    try {
      const response = await axiosToken(endPoint, );
      console.log("emails response =", response);
      const data = response?.data;
      dispatch(fetchEmailSuccess(data?.data));
 

      //warnings
      // toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchEmailFail());
      toastError(error?.response?.data?.message);
      console.log("emails get api error:", error);
    }
  };
  const deleteEmailApi = async (id) => {
    const endPoint = "/emails/"+id;

    dispatch(fetchEmailStart());
    try {
      const response = await axiosToken.delete(endPoint, );
      console.log("emails delete response =", response);
      const data = response?.data;
      dispatch(fetchEmailSuccessWithOutPayload());
 
      getEmailsApi();

      //warnings
      toastSuccess(data?.message || "Email deleted successfully");
    } catch (error) {
      dispatch(fetchEmailFail());
      toastError(error?.response?.data?.message);
      console.log("emails delete api error:", error);
    }
  };
  

  return {
    emailSubscribtionApi,deleteEmailApi,getEmailsApi
  };
};

export default useEmailServices;
