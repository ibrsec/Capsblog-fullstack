import { BsEyeFill } from "react-icons/bs";
import Blog from "./Blog";
import useBlogServices from "../../../services/useBlogServices";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useCommentServices from "../../../services/useCommentServices";
const Blogs = () => {
    const {getBlogsApi,} = useBlogServices();
    const {getCommentsApi,} = useCommentServices();
    useEffect(()=> {
        getBlogsApi("filter[isPublish]=1");
        getCommentsApi();
    },[])
    const blogs = useSelector(state=>state.blog.blogs)
    console.log('blogs', blogs)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 place-items-center my-5">
        {
            blogs?.map(blog=> <Blog key={blog?._id} blog={blog} />)
        }
      
    </div>
  );
};

export default Blogs;
