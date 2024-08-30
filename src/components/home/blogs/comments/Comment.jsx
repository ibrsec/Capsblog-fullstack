import { RiDeleteBack2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import useCommentServices from "../../../../services/useCommentServices";

const Comment = ({ comment }) => {
  const createdDate = new Date(comment?.createdAt);
  const user = useSelector((state) => state.auth.user);
const {deleteCommentApi} = useCommentServices();


  return (
    //*{/* <!-- Comment 1 --> */}
    <div className="bg-amber-500 p-4 rounded-lg shadow">
      <div className="flex items-center mb-2">
        <img
          src={comment?.userId?.image || "https://via.placeholder.com/40"}
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold">{comment?.userId?.username}</h3>
          <p className="text-sm text-gray-500">
            Posted on {createdDate.toLocaleString("default", { month: "long" })}{" "}
            {createdDate.getDay()} , {createdDate.getYear()}
          </p>
        </div>
      </div>
      <p className="text-gray-700">{comment?.comment}</p>
      {(user._id === comment?.userId?._id  || user?.isAdmin) && (
        <div className=" mx-2 flex items-center justify-end">
          <button className="flex items-center gap-1 text-red-500 hover:text-red-600 active:text-red-500 mr-2" onClick={()=> deleteCommentApi(comment?._id, comment?.blogId)}>
            <RiDeleteBack2Fill size="20px" color="red" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
