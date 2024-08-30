import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
// import { useNavigate } from "react-router-dom"; 
import { toastError, toastSuccess } from "../helpers/toastify";
import { fetchCategoryFail, fetchCategoryStart, fetchCategorySuccess, fetchCategorySuccessWithOutPayload } from "../app/features/categorySlice";

const useCategoryServices = () => {
  const { axiosToken, axiosPublic} = useAxios();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getCategoriesApi = async () => {
    const endPoint = "/categories?limit=100";

    dispatch(fetchCategoryStart());
    try {
      const response = await axiosPublic(endPoint, );
      console.log("categories response =", response);
      const data = response?.data;
      dispatch(fetchCategorySuccess(data?.data));
 

      //warnings
      // toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCategoryFail());
      toastError(error?.response?.data?.message);
      console.log("categories get api error:", error);
    }
  };
  const deleteCategoryApi = async (id) => {
    const endPoint = "/categories/"+id;

    dispatch(fetchCategoryStart());
    try {
      const response = await axiosToken.delete(endPoint, );
      console.log("category delete response =", response);
      const data = response?.data;
      dispatch(fetchCategorySuccessWithOutPayload());
 
      getCategoriesApi();

      //warnings
      toastSuccess(data?.message || "Category deleted successfully");
    } catch (error) {
      dispatch(fetchCategoryFail());
      toastError(error?.response?.data?.message);
      console.log("category delete api error:", error);
    }
  };
  
  const updateCategoryApi = async (id,payload) => {
    const endPoint = "/categories/"+id;

    dispatch(fetchCategoryStart());
    try {
      const response = await axiosToken.put(endPoint, payload);
      console.log("category update response =", response);
      const data = response?.data;
      dispatch(fetchCategorySuccessWithOutPayload());
 
      getCategoriesApi();
      
      //warnings
      toastSuccess(data?.message );
    } catch (error) {
      dispatch(fetchCategoryFail());
      toastError(error?.response?.data?.message);
      console.log("category update api error:", error);
    }
  };
  const postCategoryApi = async (payload) => {
    const endPoint = "/categories";

    dispatch(fetchCategoryStart());
    try {
      const response = await axiosToken.post(endPoint, payload);
      console.log("category post response =", response);
      const data = response?.data;
      dispatch(fetchCategorySuccessWithOutPayload());
 
      getCategoriesApi();
      
      //warnings
      toastSuccess(data?.message );
    } catch (error) {
      dispatch(fetchCategoryFail());
      toastError(error?.response?.data?.message);
      console.log("category post api error:", error);
    }
  };
  
  return { getCategoriesApi, deleteCategoryApi, updateCategoryApi, postCategoryApi };
};

export default useCategoryServices;
