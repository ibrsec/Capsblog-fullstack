import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
// import { useNavigate } from "react-router-dom"; 
import { toastError, toastSuccess } from "../helpers/toastify"; 
import { fetchAuthFail, fetchAuthStart, fetchAuthSuccessWithoutPayload, fetchUsersSuccess } from "../app/features/authSlice";

const useUserServices = () => {
  const { axiosToken, axiosPublic} = useAxios();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getUsersApi = async () => {
    const endPoint = "/users?limit=1000";

    dispatch(fetchAuthStart());
    try {
      const response = await axiosToken(endPoint, );
      console.log("users get response =", response);
      const data = response?.data;
      dispatch(fetchUsersSuccess(data?.data));
 

      //warnings
      // toastSuccess(data?.message);

    } catch (error) {
      dispatch(fetchAuthFail());
      toastError(error?.response?.data?.message);
      console.log("users get get api error:", error);
    }
  };
  const deleteUserApi = async (id) => {
    const endPoint = "/users/"+id;

    dispatch(fetchAuthStart());
    try {
      const response = await axiosToken.delete(endPoint, );
      console.log("user delete response =", response);
      const data = response?.data;
      dispatch(fetchAuthSuccessWithoutPayload());
 
      getUsersApi();

      //warnings
      toastSuccess(data?.message || "User deleted successfully");
    } catch (error) {
      dispatch(fetchAuthFail());
      toastError(error?.response?.data?.message);
      console.log("user delete api error:", error);
    }
  };
  
  // const updateCategoryApi = async (id,payload) => {
  //   const endPoint = "/categories/"+id;

  //   dispatch(fetchCategoryStart());
  //   try {
  //     const response = await axiosToken.put(endPoint, payload);
  //     console.log("category update response =", response);
  //     const data = response?.data;
  //     dispatch(fetchCategorySuccessWithOutPayload());
 
  //     getCategoriesApi();
      
  //     //warnings
  //     toastSuccess(data?.message );
  //   } catch (error) {
  //     dispatch(fetchCategoryFail());
  //     toastError(error?.response?.data?.message);
  //     console.log("category update api error:", error);
  //   }
  // };

  // const postCategoryApi = async (payload) => {
  //   const endPoint = "/categories";

  //   dispatch(fetchCategoryStart());
  //   try {
  //     const response = await axiosToken.post(endPoint, payload);
  //     console.log("category post response =", response);
  //     const data = response?.data;
  //     dispatch(fetchCategorySuccessWithOutPayload());
 
  //     getCategoriesApi();
      
  //     //warnings
  //     toastSuccess(data?.message );
  //   } catch (error) {
  //     dispatch(fetchCategoryFail());
  //     toastError(error?.response?.data?.message);
  //     console.log("category post api error:", error);
  //   }
  // };
  
  return { getUsersApi, deleteUserApi,  };
};

export default useUserServices;
