import React, { useState } from "react";
import Comment from "./Comment";
import PostNewComment from "./PostNewComment";
import { useSelector } from "react-redux";
import Spinner from "../../../Spinner";

const Comments = ({ blogId }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const commentsOfBlog = useSelector((state) => state.comment.commentsOfBlog);
  const loading = useSelector((state) => state.comment.loading);
  console.log("commentsOfBlog", commentsOfBlog);
  return (
    <div className="w-full  mx-auto mt-5 ">
      {["Comments"].map((item, index) => (
        <div key={index} className=" w-full">
          <button
            className="w-full flex justify-between items-center px-4 py-3 text-left text-amber-800 bg-amber-400 border transition-all border-amber-600 hover:text-white hover:bg-amber-800 focus:outline-none rounded-xl"
            onClick={() => toggleAccordion(index)}
          >
            <span className="font-medium">{item}</span>
            <span
              className={`transform transition-transform duration-200 ${
                activeIndex === index ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`overflow-auto transition-max-height duration-300 ease-out ${
              activeIndex === index ? "max-h-screen" : "max-h-0"
            }`}
          >
            {/* accordion content */}
            <section className="bg-transparent py-8">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl text-white font-bold mb-4">Comments</h2>

                {/* <!-- Add Comment Form --> */}
                <PostNewComment blogId={blogId} />

                <div className="space-y-4 mt-5">
                  {loading ? (
                    <Spinner />
                  ) : commentsOfBlog?.length === 0 ? (
                    <div className="text-white text-center font-bold text-xl">
                      No Comment!
                    </div>
                  ) : (
                    commentsOfBlog?.map((comment, index) => (
                      <Comment key={index} comment={comment} />
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
