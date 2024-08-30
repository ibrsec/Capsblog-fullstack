import { useSelector } from "react-redux";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

const MyProfile = () => {
  const user = useSelector((state) => state.auth.user);

  const screenCreatedUserDate = new Date(user?.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
    }
  );

  return ( 
      <div className="bg-gradient-to-r from-amber-700 to-green-500 min-h-screen  flex flex-col  justify-center items-center ">
        {/* <div className="bg-gradient-to-r from-amber-700 to-green-500 min-h-screen ">
      <div className=" max-w-[1200px] mx-auto  pt-28 pb-10 px-2 min-h-screen "></div> */}
        <div className="h-56 w-72 absolute flex justify-center items-center">
          <img
            className="object-cover h-20 w-20 rounded-full"
            src={
              user?.image ||
              "https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"
            }
            onError={(e) => {
              e.target.src =
                "https://user-images.githubusercontent.com/2351721/31314483-7611c488-ac0e-11e7-97d1-3cfc1c79610e.png"; // Placeholder URL
            }}
            alt=""
          />
        </div>
        <div
          className="
                    h-56
                    mx-4
                    w-5/6
                    bg-amber-900
                    rounded-3xl
                    shadow-md
                    sm:w-80 sm:mx-0
                  "
        >
          <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
            <h1 className="text-white">{user?.isAdmin ? "Admin" : "User"}</h1>
            {user?.isAdmin ? (
              <RiAdminFill className="text-white text-2xl" />
            ) : (
              <FaUser className="text-white text-2xl" />
            )}
          </div>
          <div
            className="
                    bg-white
                    h-auto
                    w-full
                    rounded-3xl
                    flex flex-col
                    justify-around
                    items-center
                    pb-5
                  "
          >
            <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
              <div className="flex flex-col justify-start items-start">
                <h1 className="text-gray-500 text-xs">Until</h1>
                <h1 className="text-gray-600 text-sm">
                  {screenCreatedUserDate}
                </h1>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-gray-600 text-sm">
                  {user?.gender === "male" ? (
                    <FaMale className="text-blue-500 text-3xl" />
                  ) : (
                    <FaFemale className="text-pink-500 text-3xl" />
                  )}
                </h1>
                <h1 className="text-gray-500 text-xs">
                  {user?.gender === "male" ? (
                    <span className="text-blue-500 ">Male</span>
                  ) : (
                    <span className="text-pink-500">Female</span>
                  )}
                </h1>
              </div>
            </div>
            <div className="w-full h-1/2 flex flex-col justify-center items-center">
              <h1 className="text-gray-700 font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <h1 className=" text-sm font-semibold text-gray-500">
                {user?.username}
              </h1>
              {<h1 className="text-black font-bold">{user?.email}</h1> }
              
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyProfile;
