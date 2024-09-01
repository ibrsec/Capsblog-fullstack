import { MdEmail } from "react-icons/md";
import useEmailServices from "../../services/useEmailServices";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toastDefault } from "../../helpers/toastify";
import { emailValidation } from "../../helpers/emailValidation";

const EmailSubscruction = () => {
  const { emailSubscribtionApi } = useEmailServices();
  const categories = useSelector((state) => state.category?.categories);

  const [inputs, setInputs] = useState({
    email: "",
    categoryId: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('email',inputs)

    if(!inputs.email || !inputs.categoryId) {
      toastDefault("Email and category is required for subscribtion!")
      return;
    }

    if(!emailValidation(inputs.email)){
      toastDefault("Please enter a valid email!!")
      return;
    }

    emailSubscribtionApi(inputs);


setInputs({
  email: "",
  categoryId: "",
})
  };

  return (
    <div className="">
      <form className="flex justify-center   " onSubmit={handleSubmit}>
        <div className="bg-gradient-to-r from-amber-500 to-green-700 w-full md:w-9/12 text-center opacity-70 flex items-center justify-between rounded-md  ">
          <div className="flex items-center w-full md:w-3/4 ">
            {" "}
            {/* Adjust width for email input on small screens */}
            <label htmlFor="email" className="p-2">
              <MdEmail className="text-blue-700" size="30px" />
            </label>
            <input
              type="email"
              className="w-3/5   p-4 pl-3 text-white bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200"
              placeholder="example@email.com"
              name="email"
              id="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              // Add your value and onChange handlers here
            />
          </div>
          <div className="flex items-center justify-between h-full md:w-1/4 gap-2">
            {" "}
            {/* Adjust width for button on small screens */}
            <select
              className="bg-transparent  text-white py-2 px-1 md:px-5 w-[120px] h-full font-semibold rounded-lg text-xs"
              name="category"
              id="category"
              placeholder="Category"
              value={inputs.categoryId}
              onChange={(e) => setInputs({ ...inputs, categoryId: e.target.value })}
            >
              <option  value="">
                  Category
                </option>
              {categories?.map((category, idx) => {
                
              return (
                <option key={category?._id} value={category?._id}>
                  {category.name}
                </option>
              );
            })}
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
