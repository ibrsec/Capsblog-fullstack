import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
import { useNavigate } from "react-router-dom";
import {
  fetchAuthFail,
  fetchAuthLoginSuccess,
  fetchAuthStart,
  fetchAuthRegisterSuccess,
  fetchAuthLogout,
} from "../app/features/authSlice";
import { toastError, toastSuccess } from "../helpers/toastify";

const useAuthServices = () => {
  const { axiosPublic } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginApi = async (payload) => {
    const endPoint = "/auth/login";

    dispatch(fetchAuthStart());
    try {
      const response = await axiosPublic.post(endPoint, payload);
      console.log("login response =", response);
      const data = response?.data;
      dispatch(fetchAuthLoginSuccess(data));

      //!navigate
      navigate("/");

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchAuthFail());
      toastError(error?.response?.data?.message);
      console.log("login api error:", error);
    }
  };
  const registerApi = async (payload) => {
    const endPoint = "/users";

    dispatch(fetchAuthStart());
    try {
      const response = await axiosPublic.post(endPoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("register response =", response);
      const data = response?.data;
      dispatch(fetchAuthRegisterSuccess(data));

      //!navigate
      navigate("/");

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchAuthFail());
      toastError(error?.response?.data?.message);
      console.log("register api error:", error);
    }
  };


  
  const logoutApi = async () => {
    const endPoint = "/auth/logout";

    dispatch(fetchAuthStart());
    try {
      const response = await axiosPublic(endPoint);
      console.log("logout response =", response);
      const data = response?.data;
      dispatch(fetchAuthLogout());

      // dispatch(deleteConvLogout());
      // dispatch(deleteMessageLogout());
      // // dispatch(deleteStockLogout());
      //!navigate
      navigate("/login");

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchAuthFail());
      toastError(error?.response?.data?.message);
      console.log("logout api error:", error);
    }
  };





  return { loginApi, registerApi, logoutApi };
};

export default useAuthServices;
