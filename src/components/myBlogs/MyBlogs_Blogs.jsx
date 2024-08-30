import { BsEyeFill } from "react-icons/bs";
import Blog from "../home/blogs/Blog";
import useBlogServices from "../../services/useBlogServices"; 
import { useSelector } from "react-redux";
import useCommentServices from "../../services/useCommentServices";
import {
  generateQuery,
  generateQueryPublished,
} from "../../helpers/generateQuery";
import { useLocation } from "react-router-dom";
import {
  setCategoryFilter,
  setPagination,
  setTitleSearch,
} from "../../app/features/blogSlice";
import { useEffect } from "react";
import Spinner from "../Spinner";
const MyBlogs_Blogs = () => { 
  const { getBlogsofUserApi,   } = useBlogServices();
  const { getCommentsApi } = useCommentServices();
   

  const { filters, searchs, pagination } = useSelector((state) => state.blog.myBlogQueries);
  const { loading } = useSelector((state) => state.blog);
  //     const {filters, searchs} = useSelector(state => state.blog);
  //     console.log('filters', filters)
  //     let queryString = "filter[isPublish]=1&limit=2";
  //     for(const key in filters) {
  //       if(filters[key])
  //       queryString += `&filter[${key}]=${filters[key]}`;
  //     }

  //     for(const key in searchs) {
  //       if(searchs[key])
  //       queryString += `&search[${key}]=${searchs[key]}`;
  //     }
  // console.log('queryString', queryString)
  // console.log('searchs', searchs)

  let queryString = generateQuery({ filters, searchs, pagination });
 
console.log('myBlog_Blogs',filters, searchs, pagination);

 

  useEffect(() => { 
    getBlogsofUserApi(queryString+"&sort[isPublish]=desc");
    getCommentsApi();
  }, [filters, searchs, pagination?.page]);

  const blogs = useSelector((state) => state.blog.blogs);
  
  // console.log("blogs", blogs);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 place-items-center my-5">
      {loading ? 
        <Spinner /> 
      : blogs?.length === 0?
      <div className="text-white text-center font-bold text-xl">No content</div>
      :
      blogs?.map((blog) => (
        <Blog key={blog?._id} blog={blog} />
      ))}
    </div>
  );
};

export default MyBlogs_Blogs;
