// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { useSelector } from "react-redux";

// const items = [
//   {
//     id: 1,
//     title: "Back End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 2,
//     title: "Front End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 3,
//     title: "User Interface Designer",
//     department: "Design",
//     type: "Full-time",
//     location: "Remote",
//   },
// ];

// export default function Pagination() {
//     const pagination = useSelector(state => state.blog.pagination)
//     console.log('pagination', pagination)
//   return (
//     <div className="mt-5">
//       <div className="flex items-center justify-center border-t border-amber-700 bg-transparent px-4 py-3 sm:px-6">
//         <div className="flex flex-1 justify-center sm:hidden">
//           <a
//             href="#"
//             className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Previous
//           </a>
//           <a
//             href="#"
//             className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Next
//           </a>
//         </div>
//         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
//           <div>
//             <nav
//               aria-label="Pagination"
//               className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//             >
//               <a
//                 href="#"
//                 className="relative inline-flex items-center rounded-l-md px-2 py-2 text-white  ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeftIcon aria-hidden="true" className="h-5 w-5 " />
//               </a>
//               {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
//               <a
//                 href="#"
//                 aria-current="page"
//                 className="relative z-10 inline-flex items-center  px-4 py-2 text-sm  text-white focus:z-20 font-semibold bg-amber-500"
//               >
//                 1
//               </a>
//               <a
//                 href="#"
//                 className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white  ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0"
//               >
//                 2
//               </a>
//               <a
//                 href="#"
//                 className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white  ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0 md:inline-flex"
//               >
//                 3
//               </a>
//               <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
//                 ...
//               </span>
//               <a
//                 href="#"
//                 className="relative hidden items-center px-4 py-2 text-sm font-semibold text-white  ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0 md:inline-flex"
//               >
//                 8
//               </a>
//               <a
//                 href="#"
//                 className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white  ring-1 ring-inset  ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0"
//               >
//                 9
//               </a>
//               <a
//                 href="#"
//                 className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white  ring-1 ring-inset  ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0"
//               >
//                 10
//               </a>
//               <a
//                 href="#"
//                 className="relative inline-flex items-center rounded-r-md px-2 py-2  ring-1 ring-inset text-white  ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
//               </a>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="text-center text-white">
//         <p className="text-sm ">
//           Showing <span className="font-medium">1</span> to{" "}
//           <span className="font-medium">10</span> of{" "}
//           <span className="font-medium">97</span> results
//         </p>
//       </div>
//     </div>
//   );
// }

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { setPagination } from "../../app/features/blogSlice"; // Adjust the path to where setPagination is exported
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Pagination() {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.blog.blogQueries.pagination);
  console.log("pagination", pagination);
  // Destructure necessary pagination details
  let current = pagination.page || 1;
  const {  next, previous, totalPages } = pagination.pages || {};
  const totalItems = pagination.totalRecords || 0;
  const itemsPerPage = pagination.limit || 15;
  const startItem = ((current || 1) - 1) * itemsPerPage + 1;
  const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);


  const handlePageChange = (newPage) => {
    // Update the pagination state in Redux

    



    dispatch(
      setPagination({
        ...pagination,
        page: newPage,
        pages: {
          ...pagination.pages,
          current: newPage,
          previous: newPage > 1,
          next: newPage < totalPages,
        },
      })
    );
  };


  return (
    <div className="mt-5">
      <div className="flex items-center justify-center border-t border-amber-700 bg-transparent px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-center items-center flex-col sm:hidden gap-2">
          <div className="flex items-center justify-center ">
            <button
              disabled={!previous}
              onClick={() => handlePageChange(current - 1)}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                !previous ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              disabled={!next}
              onClick={() => handlePageChange(current + 1)}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
                !next ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
          <p className="text-sm text-white text-center">Page:{current}</p>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <button
                disabled={!previous}
                onClick={() => handlePageChange(current - 1)}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0 ${
                  !previous ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </button>
              {/* Dynamically generate page numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-amber-300  hover:bg-amber-400 focus:z-20 focus:outline-offset-0 ${
                      current === pageNum ? "bg-amber-500" : "bg-amber-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                disabled={!next}
                onClick={() => handlePageChange(current + 1)}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0 ${
                  !next ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="text-center text-white">
        <p className="text-sm">
          Showing <span className="font-medium">{startItem}</span> to{" "}
          <span className="font-medium">{endItem}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
    </div>
  );
}





// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
// import { useSelector, useDispatch } from "react-redux";
// import { setPagination } from "../../app/features/blogSlice"; // Adjust the path to where setPagination is exported
// import { useLocation } from "react-router-dom";
// import { useEffect, useRef } from "react";

// export default function Pagination() {
//   const dispatch = useDispatch();
//   const pagination = useSelector((state) => state.blog.blogQueries.pagination);
//   const location = useLocation();
//   const hasResetPage = useRef(false); // To track if page reset has already occurred

//   console.log("pagination", pagination);

//   // Destructure necessary pagination details
//   let current = pagination.page || 1;
//   const { next, previous, totalPages } = pagination.pages || {};
//   const totalItems = pagination.totalRecords || 0;
//   const itemsPerPage = pagination.limit || 15;
//   const startItem = ((current || 1) - 1) * itemsPerPage + 1;
//   const endItem = Math.min(startItem + itemsPerPage - 1, totalItems);

//   const handlePageChange = (newPage) => {
//     // Update the pagination state in Redux
//     dispatch(
//       setPagination({
//         ...pagination,
//         page: newPage,
//         pages: {
//           ...pagination.pages,
//           current: newPage,
//           previous: newPage > 1,
//           next: newPage < totalPages,
//         },
//       })
//     );
//   };

//   // Reset page number to 1 when location pathname changes
//   useEffect(() => {
//     if (!hasResetPage.current) {
//       // Reset page only if it hasn't been reset since the route change
//       dispatch(
//         setPagination({
//           ...pagination,
//           page: 1,
//           pages: {
//             ...pagination.pages,
//             current: 1,
//             previous: false,
//             next: totalPages > 1,
//           },
//         })
//       );
//       hasResetPage.current = true; // Mark as reset
//     }
//   }, [location.pathname, dispatch, totalPages]);

//   // Reset hasResetPage ref on route change
//   useEffect(() => {
//     hasResetPage.current = false; // Allow reset on next route change
//   }, [location.pathname]);

//   return (
//     <div className="mt-5">
//       <div className="flex items-center justify-center border-t border-amber-700 bg-transparent px-4 py-3 sm:px-6">
//         <div className="flex flex-1 justify-center items-center flex-col sm:hidden gap-2">
//           <div className="flex items-center justify-center">
//             <button
//               disabled={!previous}
//               onClick={() => handlePageChange(current - 1)}
//               className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
//                 !previous ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               Previous
//             </button>
//             <button
//               disabled={!next}
//               onClick={() => handlePageChange(current + 1)}
//               className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${
//                 !next ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               Next
//             </button>
//           </div>
//           <p className="text-sm text-white text-center">Page: {current}</p>
//         </div>
//         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
//           <div>
//             <nav
//               aria-label="Pagination"
//               className="isolate inline-flex -space-x-px rounded-md shadow-sm"
//             >
//               <button
//                 disabled={!previous}
//                 onClick={() => handlePageChange(current - 1)}
//                 className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-white ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0 ${
//                   !previous ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <span className="sr-only">Previous</span>
//                 <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
//               </button>
//               {/* Dynamically generate page numbers */}
//               {[...Array(totalPages)].map((_, index) => {
//                 const pageNum = index + 1;
//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => handlePageChange(pageNum)}
//                     className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-amber-300 hover:bg-amber-400 focus:z-20 focus:outline-offset-0 ${
//                       current === pageNum ? "bg-amber-500" : "bg-amber-700"
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//               <button
//                 disabled={!next}
//                 onClick={() => handlePageChange(current + 1)}
//                 className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-white ring-1 ring-inset ring-amber-300 bg-amber-700 hover:bg-amber-400 focus:z-20 focus:outline-offset-0 ${
//                   !next ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <span className="sr-only">Next</span>
//                 <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="text-center text-white">
//         <p className="text-sm">
//           Showing <span className="font-medium">{startItem}</span> to{" "}
//           <span className="font-medium">{endItem}</span> of{" "}
//           <span className="font-medium">{totalItems}</span> results
//         </p>
//       </div>
//     </div>
//   );
// }
