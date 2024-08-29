import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import BlogDetailPage from "../pages/BlogDetailPage";


const AppRouter = () => {
  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blogDetails/:id" element={<BlogDetailPage />} />

            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </BrowserRouter>

  )
}

export default AppRouter