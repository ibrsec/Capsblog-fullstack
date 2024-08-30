import React, { useState } from "react";
import useCommentServices from "../../../../services/useCommentServices";

const PostNewComment = ({blogId}) => {
    const {postCommentApi} =useCommentServices()
    const [commentInput, setCommentInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!commentInput.trim()) {
          return;
        }
        postCommentApi({blogId, comment: commentInput});
        setCommentInput("");
      };
    


  return (
    // <!-- Add Comment Form -->
      <form className="mt-8  p-4 rounded-lg shadow  bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-amber-600" onSubmit={handleSubmit}>
        <h3 className="text-lg text-amber-300 font-semibold mb-2">Add a Comment</h3>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-amber-300 font-medium mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows="4"
            className="w-full px-3 py-2 bg-amber-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={commentInput}
            onChange={(e)=>setCommentInput(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-amber-800 text-white px-4 py-2 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          Post Comment
        </button>
      </form>

  );
};

export default PostNewComment;
