import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setMyBlogPagination, setMyBlogTitleSearch } from "../../app/features/blogSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const MyBlogSearchBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchs = useSelector((state) => state.blog.myBlogQueries.searchs);
  const pagination = useSelector((state) => state.blog.myBlogQueries.searchs);

  const [search, setSearch] = useState(searchs?.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(setMyBlogPagination({...pagination,page:1,pages:{...pagination?.pages,current:1}}))
      dispatch(setMyBlogTitleSearch(search));
    }
  };

  // useEffect(()=>{
  //   setSearch("")
  // },[location.pathname])

  return (
    <div className="">
      <form className="flex justify-center   " onSubmit={handleSubmit}>
        <div className="bg-gradient-to-r from-amber-500 to-green-700 w-full md:w-9/12 text-center opacity-70 flex items-center justify-between rounded-md  ">
          <div className="flex items-center w-full md:w-3/4 ">
            {" "}
            {/* Adjust width for email input on small screens */}
            <label htmlFor="email" className="p-2">
              <FaSearch className="text-blue-700" size="30px" />
            </label>
            <input
              type="text"
              className="w-3/5   p-4 pl-3 text-white bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200"
              placeholder="Seacrh here..."
              name="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between h-full md:w-1/4 gap-2">
            {" "}
            {/* Adjust width for button on small screens */}
            <div className="h-full w-full ">
              <button
                className="   py-2 px-1 md:px-5 w-full h-full text-sm font-semibold text-white bg-amber-700 hover:bg-amber-600 active:bg-amber-500 transition-all rounded-lg text-center"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
      {searchs?.title && (
        <div className="mt-2 mb-4 flex items-center justify-center gap-2 ">
          <span className="text-white">Search:</span>
          <span
            className="bg-amber-500 text-white px-3 py-1 rounded-full hover:bg-amber-600 active:bg-amber-400 cursor-pointer"
            onClick={() => {
              dispatch(setMyBlogTitleSearch(""));
              setSearch("");
            }}
          >
            {searchs?.title} ⅹ
          </span>
        </div>
      )}
    </div>
  );
};

export default MyBlogSearchBar;

// <form className=" flex justify-center">
// <div className=" bg-gradient-to-r from-amber-500 to-green-700 w-11/12 md:w-7/12 text-center opacity-70 flex items-center justify-between rounded-md ">
//   <div className="flex items-center ">
//     <label htmlFor="email" className="p-2 ">
//       <MdEmail className="text-blue-700 " size="30px" />
//     </label>
//     <input
//       type="email"
//       className=" p-4 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200  "
//       placeholder="example@email.com"
//       name="email"
//       id="email"
//       // value={inputs.email}
//       // onChange={handleChange}
//     />
//   </div>
//   <div className="flex items-center  h-full ">
//     <select className="bg-transparent " name="category" id="category">
//       <option value="">Tech</option>
//       <option value="">Food</option>
//     </select>
//     <div className="h-full translate-x-1 ">
//       <button
//         className="bg-amber-700 text-white py-2 px-1 md:px-5 w-full h-full text-sm font-semibold hover:bg-amber-600 active:bg-amber-500 transition-all rounded-lg text-center"
//         type="submit"
//       >
//         Subscract
//       </button>
//     </div>
//   </div>
// </div>
// </form>
