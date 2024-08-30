import React, { useEffect } from "react";
import Blog from "../components/home/blogs/Blog";
import { useParams } from "react-router-dom";
import useBlogServices from "../services/useBlogServices";
import { useSelector } from "react-redux";
import useCommentServices from "../services/useCommentServices";

const BlogDetailPage = () => {
    const {id} = useParams();

    const {getOneBlogApi} = useBlogServices();
    const { getCommentsOfBlog} = useCommentServices();
    useEffect(()=> {
        getOneBlogApi(id);
        getCommentsOfBlog(id); 
    },[])
    const blog =  useSelector(state=> state.blog.oneBlog);
  return (
    <div className="bg-gradient-to-r from-amber-700 to-green-500 min-h-screen ">
      <div className=" max-w-[1200px] mx-auto  pt-28 pb-10 px-2 min-h-screen ">
        <div>
          <h2 className="text-white text-center font-bold text-3xl">
            Blog Details
          </h2>
        </div>
  

        {/*//? Blogs */}
        <div className="flex items-center justify-center my-5">
          <Blog blog={blog} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
