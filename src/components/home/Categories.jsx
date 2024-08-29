import { useEffect } from "react";
import useCategoryServices from "../../services/useCategoryServices";
import { useSelector } from "react-redux";

const Categories = () => {
  const { getCategoriesApi } = useCategoryServices();
  useEffect(() => {
    getCategoriesApi();
  }, []);
  const categories = useSelector((state) => state.category.categories);
  console.log("categories", categories);
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
          >
            {categories?.map((category,idx) => {
            const classSpec = idx === 0 ? "rounded-s-lg" : idx === categories?.length -1 ? "rounded-e-lg" : "";
            return (
                <option key={category?._id}>{category.name}</option>
            );
          })}
            
          </select>
        </div>
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex divide-gray-700  ">
          {categories?.map((category,idx) => {
            const classSpec = idx === 0 ? "rounded-s-lg" : idx === categories?.length -1 ? "rounded-e-lg" : "";
            return (
              <li key={category?._id} className="w-full focus-within:z-10">
                <a
                  href="#"
                  className={"inline-block w-full p-4 text-white bg-amber-800 border-r   border-gray-700  hover:bg-amber-700  active:bg-amber-900   focus:bg-amber-900 text-nowrap  "+ classSpec} 
                  aria-current="page"
                >
                  {category.name}
                </a>
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

export default Categories;
