import { useEffect, useState } from "react";
import useCategoryServices from "../../services/useCategoryServices";
import { useDispatch, useSelector } from "react-redux";
import { setMyBlogCategoryFilter, setMyBlogPagination } from "../../app/features/blogSlice";
import { useLocation } from "react-router-dom";

const MyBlogCategories = () => {
  const { getCategoriesApi } = useCategoryServices();
  useEffect(() => {
    getCategoriesApi();
  }, []);
  const categories = useSelector((state) => state.category.categories);
  const activeCategoryGlobal = useSelector(
    (state) => state.blog.myBlogQueries.filters.categoryId
  );
  const pagination = useSelector(
    (state) => state.blog.myBlogQueries.pagination
  );

  const [activeCategoryId, setActiveCategoryId] = useState(
    activeCategoryGlobal || ""
  );

  const dispatch = useDispatch();

  // const location = useLocation();
  // useEffect(()=>{
  //   setActiveCategoryId("")
  // },[location.pathname])

  return (
    <div>
      <>
        <p className="text-white text-center font-bold text-lg my-1">
          CATEGORIES
        </p>
        <div className="sm:hidden">
          <label htmlFor="tabs">Select a Category:</label>
          <select
            id="tabs"
            className="bg-amber-800 border border-gray-300 text-white text-sm rounded-lg focus:bg-amber-900 block w-full p-2.5 mt-2 "
            value={activeCategoryId}
            onChange={(e) => {
              setActiveCategoryId(e.target.value)
              dispatch(setMyBlogPagination({...pagination,page:1,pages:{...pagination?.pages,current:1}}))
              dispatch(setMyBlogCategoryFilter(e.target.value));
            }}
          >
            <option value="">All</option>
            {categories?.map((category, idx) => {
              return (
                <option key={category?._id} value={category?._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex divide-gray-700  ">
          <li className="w-full focus-within:z-10">
            <div
              className={
                "rounded-s-lg inline-block w-full p-4 text-white  border-r   border-gray-700  hover:bg-amber-700  active:bg-amber-900   focus:bg-amber-900 text-nowrap cursor-pointer " +
                (activeCategoryId == "" ? "bg-amber-500" : "bg-amber-800")
              }
              aria-current="page"
              onClick={() => {
                setActiveCategoryId("");
                dispatch(setMyBlogPagination({...pagination,page:1,pages:{...pagination?.pages,current:1}}))
                dispatch(setMyBlogCategoryFilter(""));
              }}
            >
              All
            </div>
          </li>
          {categories?.map((category, idx) => {
            let classSpec =
              idx === categories?.length - 1 ? "rounded-e-lg" : "";

            if (category?._id == activeCategoryId) {
              classSpec += " bg-amber-500 ";
            } else {
              classSpec += " bg-amber-800 ";
            }

            return (
              <li key={category?._id} className="w-full focus-within:z-10">
                <div
                  className={
                    "inline-block w-full p-4 text-white  border-r   border-gray-700  hover:bg-amber-700  active:bg-amber-900   focus:bg-amber-900 text-nowrap  cursor-pointer " +
                    classSpec
                  }
                  aria-current="page"
                  onClick={() => {
                    setActiveCategoryId(category?._id);
                    dispatch(setMyBlogPagination({...pagination,page:1,pages:{...pagination?.pages,current:1}}))
                    dispatch(setMyBlogCategoryFilter(category?._id));
                  }}
                >
                  {category.name}
                </div>
              </li>
            );
          })}
          {/* active */}
          {/* <li className="w-full focus-within:z-10">
            <a
              href="#"
              className="inline-block w-full p-4 text-white bg-amber-800 border-r  rounded-s-lg border-gray-700  hover:bg-amber-700  active:bg-amber-900   focus:bg-amber-900  active "
              aria-current="page"
            >
              Profile
            </a>
          </li>
          <li className="w-full focus-within:z-10">
            <a
              href="#"
              className="inline-block w-full p-4 text-white bg-amber-800 border-r border-gray-700   hover:bg-amber-700  focus:bg-amber-900 "
            >
              Dashboard
            </a>
          </li>
          <li className="w-full focus-within:z-10">
            <a
              href="#"
              className="inline-block w-full p-4 text-white bg-amber-800 border-r border-gray-700   hover:bg-amber-700  focus:bg-amber-900 "
            >
              Settings
            </a>
          </li>
          <li className="w-full focus-within:z-10">
            <a
              href="#"
              className="inline-block w-full p-4 text-white bg-amber-800 border-r   border-gray-700  hover:bg-amber-700  active:bg-amber-900   focus:bg-amber-900   "
            >
              Invoice
            </a>
          </li> */}
        </ul>
      </>
    </div>
  );
};

export default MyBlogCategories;
