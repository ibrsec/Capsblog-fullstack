import { LiaBloggerB } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdPersonAdd } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { PiGenderIntersexBold } from "react-icons/pi";
import { FaImage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toastDefault } from "../helpers/toastify";
import useAuthServices from "../services/useAuthServices";
import { passwordValidation } from "../helpers/passwordValidation";
import { emailValidation } from "../helpers/emailValidation";

const Register = () => {
  const { registerApi } = useAuthServices();
  const [passEye, setPassEye] = useState(false);
  const [passError, setPassError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setInputs({
      ...inputs,
      [name]: files ? files[0] : value, // Dosya seçildiyse `files` kullanılır
    });
  };

  useEffect(() => {
    if (inputs.password) passwordValidation(inputs.password, setPassError);
  }, [inputs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);
    if (
      !inputs.username ||
      !inputs.password ||
      !inputs.email ||
      !inputs.firstName ||
      !inputs.lastName ||
      !inputs.gender

    ) {
      toastDefault("All fields are required!");
      return;
    }
    if (!emailValidation(inputs.email)) {
      toastDefault("Invalid email type! (__@__.__)");
      return;
    }

    if (passError) {
      toastDefault("Invalid password type!");
      return;
    }

    const formPayload = new FormData();
    for (let key in inputs) {
      formPayload.append(key, inputs[key]);
    }

    registerApi(formPayload);

    setInputs({
      username: "",
      password: "", 
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      image: null,
    });
  };

  return (
    <div className=" pt-28 pb-10 px-1 bg-gradient-to-r from-green-500 to-blue-500 min-h-screen flex items-center justify-center">
      <div className=" p-3 rounded-lg min-w-96">
        <div className="flex items-center justify-center">
          <LiaBloggerB color="white" size="100px" />
        </div>
        <h1 className="text-center text-white text-xl font-bold font-sans ">
          Register Page
        </h1>

        <form
          className="my-5 flex items-center justify-center flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className=" bg-gradient-to-r from-green-600 to-blue-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
            <label htmlFor="username" className="p-2 ">
              <FaUser className="text-blue-700" />
            </label>
            <input
              type="text"
              autoFocus
              className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
              placeholder="Username"
              name="username"
              id="username"
              value={inputs.username}
              onChange={handleChange}
            />
          </div>
          <div className=" bg-gradient-to-r from-green-600 to-blue-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
            <label htmlFor="email" className="p-2 " >
              <MdEmail className="text-blue-700" />
            </label>
            <input
              type="email"
              className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
              placeholder="example@email.com"
              name="email"
              id="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <div className=" bg-gradient-to-r from-green-600 to-blue-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md relative">
            <label htmlFor="password" className="p-2 ">
              <FaLock className="text-blue-700" />
            </label>
            <input
              type={passEye ? "text" : "password"}
              className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
              placeholder="Password"
              name="password"
              id="password"
              value={inputs.password}
              onChange={handleChange}
            />
            {passError && (
              <span className=" px-2 text-[9px] text-red-600 bg-green-400 rounded-xl font-semibold absolute start-0 -bottom-4 ">
                {passError}
              </span>
            )}
            <div className="absolute end-2" >
              <FaEye
                color="white"
                size="17px"
                onClick={() => setPassEye(!passEye)}
                className="cursor-pointer"
              />
            </div>
          </div>

          {/*//? firstName */}
          <div className=" bg-gradient-to-r from-green-600 to-blue-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
            <label htmlFor="firstName" className="p-2 " onSubmit={handleSubmit}>
              <MdPersonAdd className="text-blue-700" />
            </label>
            <input
              type="text"
              className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
              placeholder="First Name"
              name="firstName"
              id="firstName"
              value={inputs.firstName}
              onChange={handleChange}
            />
          </div>

          {/*//? lastName */}
          <div className=" bg-gradient-to-r from-green-600 to-blue-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
            <label htmlFor="lastName" className="p-2 " onSubmit={handleSubmit}>
              <MdPersonAddAlt1 className="text-blue-700" />
            </label>
            <input
              type="text"
              className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              value={inputs.lastName}
              onChange={handleChange}
            />
          </div>

          {/*//? gender */}
          <div className=" bg-gradient-to-r from-green-600 to-blue-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
            <div className="p-2 " onSubmit={handleSubmit}>
              <PiGenderIntersexBold className="text-blue-700" />
            </div>
            <div className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 ">
              <label htmlFor="male">
              <input
                type="radio"
                className="me-2"
                placeholder="Male"
                name="gender"
                id="male"
                checked={inputs.gender === "male"}
                onChange={(e)=> {setInputs({...inputs, gender: e.target.id})}}
              />
              Male</label>
              <label htmlFor="female" className="ms-3">
              <input
                type="radio"
                className="me-2"
                placeholder="Female"
                name="gender"
                id="female"
                checked={inputs.gender === "female"}
                onChange={(e)=> {setInputs({...inputs, gender: e.target.id})}}
              />
              Female</label>
            </div>
          </div>





          {/* //? image file */}
          <div className=" bg-gradient-to-r from-green-600 to-blue-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md relative">
            <label htmlFor="image" className="p-2 " onSubmit={handleSubmit}>
              <FaImage className="text-blue-700" />
            </label>
            <input
              type="file"
              className="p-2 pl-3 text-white  bg-transparent focus:outline-none border-l-2 border-green-300 placeholder-gray-200 "
              placeholder="Image"
              name="image"
              id="image"
              onChange={handleChange}
            />
            <span className="absolute text-[9px] text-red-500 bg-slate-200 px-1 rounded-xl end-1 top-0 opacity-55">Not required</span>
          </div>


          











          <div className="mt-3 w-9/12">
            <button
              className="bg-blue-700 text-white py-2 px-16 w-full text-sm font-semibold hover:bg-blue-600 active:bg-blue-500 transition-all rounded-lg"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <div>
          <p className="text-center text-xs text-white">
            Do you have a account?{" "}
            <Link to="/login" className="text-lime-800 hover:text-lime-900">
              {" "}
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
