import { MdEmail } from "react-icons/md";
const EmailSubscruction = () => {
  return (
    <div className="">
     
     <form className="flex justify-center   ">
      <div className="bg-gradient-to-r from-amber-500 to-green-700 w-full md:w-9/12 text-center opacity-70 flex items-center justify-between rounded-md  ">
        <div className="flex items-center w-full md:w-3/4 "> {/* Adjust width for email input on small screens */}
          <label htmlFor="email" className="p-2">
            <MdEmail className="text-blue-700" size="30px" />
          </label>
          <input
            type="email"
            className="w-3/5   p-4 pl-3 text-white bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200"
            placeholder="example@email.com"
            name="email"
            id="email"
            // Add your value and onChange handlers here
          />
        </div>
        <div className="flex items-center justify-between h-full md:w-1/4 gap-2"> {/* Adjust width for button on small screens */}
          <select className="bg-transparent  text-white py-2 px-1 md:px-5 w-[120px] h-full font-semibold rounded-lg text-xs" name="category" id="category" placeholder="Category"> 
            <option value="">Tech</option>
            <option value="">Food</option>
          </select>
          <div className="h-full  "> 
            <button
              className="   py-2 px-1 md:px-5 w-full h-full text-sm font-semibold text-white bg-amber-700 hover:bg-amber-600 active:bg-amber-500 transition-all rounded-lg text-center"
              type="submit"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </form>

    </div>
  );
};

export default EmailSubscruction;




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