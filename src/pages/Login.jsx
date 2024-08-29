import { LiaBloggerB } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthServices from "../services/useAuthServices";
import { passwordValidation } from "../helpers/passwordValidation";
import { toastDefault, toastWarn } from "../helpers/toastify";
// import { useSelector } from "react-redux";

const Login = () => {
  const { loginApi } = useAuthServices();
  const [passEye, setPassEye] = useState(false);
  const [passError, setPassError] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    
  };

  useEffect(()=>{
    if(inputs.password)
      passwordValidation(inputs.password,setPassError);
    
  },[inputs])




  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(!inputs.username || !inputs.password){
      toastDefault("Please enter a username and a password!");
      return;
    }
    
    if(passError){
      toastDefault("Invalid password type!");
      return;
    }

    loginApi(inputs);

    setInputs({
      username: "",
      password: "",
    });
  };


  return (
    <div className="pt-28 pb-10 px-1  bg-gradient-to-r from-blue-500 to-green-500 min-h-screen flex items-center justify-center">
      <div className=" p-3 rounded-lg min-w-96">
        <div className="flex items-center justify-center">
          <LiaBloggerB color="white" size="100px" />
        </div>
        <h1 className="text-center text-white text-xl font-bold font-sans ">
          Login Page
        </h1>

        <form
          className="my-5 flex items-center justify-center flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div className=" bg-gradient-to-r from-blue-600 to-green-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md">
            <label htmlFor="username" className="p-2 ">
              <FaUser color="lime" />
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
          <div className=" bg-gradient-to-r from-blue-600 to-green-600  w-9/12 text-center opacity-70 flex items-center justify-start rounded-md relative">
            <label htmlFor="password" className="p-2 ">
              <FaLock color="lime" />
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
              <span className=" px-2 text-xs text-red-600 bg-green-400 rounded-xl font-semibold absolute start-0 -bottom-5 ">
                {passError}
              </span>
            )}
            <div className="absolute end-2">
              <FaEye
                color="white"
                size="17px"
                onClick={() => setPassEye(!passEye)}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-4 w-9/12">
            <button
              className="bg-lime-700 text-white py-2 px-16 w-full text-sm font-semibold hover:bg-lime-600 active:bg-lime-500 transition-all rounded-lg"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <p className="text-center text-xs text-white">
            Don't tou have a account?{" "}
            <Link to="/register" className="text-lime-800 hover:text-lime-900">
              {" "}
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
