import { LiaBloggerB } from "react-icons/lia";

import { MdEmail } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import EmailSubscruction from "../components/home/EmailSubscruction";
import Categories from "../components/home/Categories";
import Blogs from "../components/home/blogs/Blogs";
import NewPostButton from "../components/home/newPost/NewPostButton";
import { useEffect, useState } from "react";
import NewPostModal from "../components/home/newPost/NewPostModal";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/home/SearchBar";
import Pagination from "../components/home/Pagination"; 
import MyBlogs_Blogs from "../components/myBlogs/MyBlogs_Blogs";
import { setCategoryFilter, setPagination, setTitleSearch } from "../app/features/blogSlice";
import MyBlogSearchBar from "../components/myBlogs/MyBlogSearchBar";
import MyBlogCategories from "../components/myBlogs/MyBlogCategories";
import MyBlogPagination from "../components/myBlogs/MyBlogPagination";
const MyBlogs = () => {
  const [open, setOpen] = useState(false)
  const accessToken = useSelector(state => state.auth.accessToken)

  return (
    <div className="bg-gradient-to-r from-amber-700 to-green-500 min-h-screen ">
      <div className=" max-w-[1200px] mx-auto  pt-28 pb-10 px-2 min-h-screen ">
        <div>
          <h2 className="text-white text-center font-bold text-3xl">
            My blogs
          </h2>
           
        </div>
 
        <div className="flex items-center justify-center my-5 " >
          <MyBlogCategories />
        </div>
        <MyBlogSearchBar />

        <MyBlogPagination />

        {/*//? Blogs */}
        <div className="flex items-center justify-center my-5">
          <MyBlogs_Blogs />
        </div>
      </div>
      {
        accessToken && <NewPostButton setOpen={setOpen}/>
      }
      
      <NewPostModal open={open} setOpen={setOpen}/>
    </div>
  );
};
 


export default MyBlogs