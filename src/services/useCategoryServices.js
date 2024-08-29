import { useDispatch } from "react-redux";
import useAxios from "./useAxios";
// import { useNavigate } from "react-router-dom"; 
import { toastError, toastSuccess } from "../helpers/toastify";
import { fetchCategoryFail, fetchCategoryStart, fetchCategorySuccess } from "../app/features/categorySlice";

const useCategoryServices = () => {
  const { axiosToken, axiosPublic} = useAxios();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getCategoriesApi = async () => {
    const endPoint = "/categories";

    dispatch(fetchCategoryStart());
    try {
      const response = await axiosPublic(endPoint, );
      console.log("categories response =", response);
      const data = response?.data;
      dispatch(fetchCategorySuccess(data?.data));
 

      //warnings
      toastSuccess(data?.message);
    } catch (error) {
      dispatch(fetchCategoryFail());
      toastError(error?.response?.data?.message);
      console.log("categories get api error:", error);
    }
  };

  return { getCategoriesApi  };
};

export default useCategoryServices;
