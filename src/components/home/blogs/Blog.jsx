import React, { useEffect } from "react";
import useBlogServices from "../../../services/useBlogServices";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const likes = useSelector((state) => state.blog.likes[blog?._id]);
  const countOfLike = likes?.length || 0;

  const comments = useSelector((state) => state.comment.comments);
  console.log("comments", comments);
  const blogsComments = comments?.filter(
    (comment) => comment?.blogId === blog?._id
  );

  const { toggleLikeOfBlogApi } = useBlogServices();
  const user = useSelector((state) => state.auth.user);
  const isUserLiked = likes?.includes(user?._id);
  console.log('blog?.image', blog?.image)

  return (
    <article className={location.pathname.startsWith("/blogDetails") ? "" : "h-[590px]  min-w-[370px] sm:min-w-[315px] md:min-w-[378px] lg:min-w-[335px] xl:min-w-0" +"  mb-4 break-inside p-6 rounded-xl bg-[#324706] bg-gradient-to-r to-amber-700 from-[#324706]  flex flex-col bg-clip-border justify-between border border-black"}>
      <div className="flex pb-6 items-start justify-between">
        <div className="flex">
          <img
            className="rounded-full max-w-none w-12 h-12 inline-block mr-4 object-cover"
            src={blog?.userId?.image}
          />
          <div className="flex flex-col">
            <div>
              <span className="inline-block text-md font-semibold text-white">
                {blog?.userId?.username}
              </span>
            </div>
            <div className="text-slate-400 text-sm">
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
        <div className="text-end text-lime-300 text-sm font-semibold ">{blog?.categoryId?.name}</div>
      </div>
      <h2 className="text-xl font-bold text-white text-center line-clamp-2">
        {blog?.title}
      </h2>
      <div className="py-4   w-full h-1/2">
        <div className="flex justify-between gap-1 mb-1   w-full h-full">
          <div className="flex   w-full h-full ">
            <img
              className=" rounded-tl-lg object-contain   h-full w-full"
              src={blog?.image || "https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"}
              onError={(e) => {
                e.target.src = "https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"; // Placeholder URL
              }}
              alt="blog image"
            />
          </div>
        </div>
      </div>
      <p className="text-slate-200 text-sm line-clamp-4 text-justify">
        {blog?.content}
      </p>
      {/* fav */}
      <div className="flex items-center justify-center gap-3">
        <div className="py-4">
          <span
            onClick={() => toggleLikeOfBlogApi(blog?._id)}
            className="cursor-pointer inline-flex items-center"
            href="#"
          >
            <span className="mr-2">
              <svg
                className={isUserLiked ? "fill-rose-600 " : "gray"}
                style={{ width: 24, height: 24 }}
                viewBox="0 0 24 24"
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </span>
            <span className="text-lg font-bold">{countOfLike}</span>
          </span>
        </div>
        {/* comment */}
        <div className="py-4">
          <div className="inline-flex items-center">
            <span className="mr-2">
              <svg
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="796 796 200 200"
                xmlSpace="preserve"
              >
                <path d="M896.001 812.517c-55.23 0-100.001 31.369-100.001 70.071 0 18.018 9.72 34.439 25.67 46.851a12.222 12.222 0 014.424 12.286l-6.872 30.926a5.613 5.613 0 008.613 5.877l36.909-24.804a15.745 15.745 0 0111.032-2.516 141.295 141.295 0 0020.226 1.448c55.227 0 99.999-31.37 99.999-70.069-.001-38.701-44.772-70.07-100-70.07z" />
              </svg>
            </span>
            <span className="text-lg font-bold">{blogsComments?.length}</span>
          </div>
        </div>

        {/* visibility */}
        <div className="py-4">
          <a className="inline-flex items-center" href="#">
            <span className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 64 64"
                xmlSpace="preserve"
              >
                <path
                  fill="#F9EBB2"
                  d="M32 48.001c-14.195 0-21.43-11.734-23.59-15.989C10.574 27.793 17.891 16 32 16c14.195 0 21.431 11.734 23.591 15.988-2.164 4.22-9.482 16.013-23.591 16.013z"
                />
                <g fill="#394240">
                  <path d="M63.716 30.516C63.349 29.594 54.45 8 32 8 9.55 8 .652 29.594.285 30.516a4.019 4.019 0 000 2.969C.652 34.407 9.55 56.001 32 56.001s31.349-21.594 31.716-22.517a4.016 4.016 0 000-2.968zM32 48.001c-14.195 0-21.43-11.734-23.59-15.989C10.574 27.793 17.891 16 32 16c14.195 0 21.431 11.734 23.591 15.988-2.164 4.22-9.482 16.013-23.591 16.013z" />
                  <circle cx={32} cy={32} r={8} />
                </g>
              </svg>
            </span>
            <span className="text-lg font-bold">{blog?.countOfVisitors}</span>
          </a>
        </div>
      </div>
      <div className="mt-4 ">
        {location.pathname.startsWith("/blogDetails") ? (
          <div className="flex items-center justify-center gap-2">
            
          <button
            onClick={() => navigate("/")}
            className="text-nowrap bg-lime-700 text-white py-3 px-16 w-full text-sm font-semibold hover:bg-lime-600 active:bg-lime-500 transition-all rounded-lg"
          >
            Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-nowrap bg-lime-700 text-white py-3 px-16 w-full text-sm font-semibold hover:bg-lime-600 active:bg-lime-500 transition-all rounded-lg"
          >
            Go Back
          </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/blogDetails/" + blog?._id)}
            className="text-nowrap bg-lime-700 text-white py-3 px-16 w-full text-sm font-semibold hover:bg-lime-600 active:bg-lime-500 transition-all rounded-lg"
          >
            Read More...
          </button>
        )}
      </div>
    </article>
  );
};

export default Blog;
