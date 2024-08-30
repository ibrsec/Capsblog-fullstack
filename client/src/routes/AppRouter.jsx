import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import BlogDetailPage from "../pages/BlogDetailPage";
import PrivateRouter from "./PrivateRouter";
import MyBlogs from "../pages/MyBlogs";
import MyProfile from "../pages/MyProfile";
import AdminPanel from "../pages/AdminPanel";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogDetails/:id" element={<PrivateRouter />}>
          <Route path="" element={<BlogDetailPage />} />
        </Route>
        <Route path="/myblogs" element={<PrivateRouter />}>
          <Route path="" element={<MyBlogs />} />
        </Route>
        <Route path="/myprofile" element={<PrivateRouter />}>
          <Route path="" element={<MyProfile />} />
        </Route>
        <Route path="/adminpanel" element={<PrivateRouter />}>
          <Route path="" element={<AdminPanel />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
