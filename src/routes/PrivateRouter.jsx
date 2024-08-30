import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toastError, toastWarn } from "../helpers/toastify";

const PrivateRouter = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  console.log('accessToken', accessToken)
  if(!accessToken)  {toastWarn("You must Login first!");}


  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
