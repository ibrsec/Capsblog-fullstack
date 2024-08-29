import { LiaBloggerB } from "react-icons/lia";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAuthServices from "../services/useAuthServices";

const Navbar = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  const { logoutApi } = useAuthServices();
  return (
    <div className="w-full bg-indigo-500 px-3 py-2 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-lg  flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <Link to="/" className="flex items-center gap-1">
        <LiaBloggerB color="white" size="40px" />
        <span className="text-white text-sm font-bold">Caps Blog</span>
      </Link>
      <div>
        <ul className="flex items-center gap-2">
          <li>
            <Link
              to="/"
              className="text-xs text-white hover:text-slate-200 active:text-slate-100 transition-all"
            >
              Home
            </Link>
          </li>
          {accessToken && (
            <li>
              <Link className="text-xs text-white hover:text-slate-200 active:text-slate-100 transition-all">
                My Blogs
              </Link>
            </li>
          )}
          {!accessToken && (
            <li>
              <Link
                className="text-xs text-white hover:text-slate-200 active:text-slate-100 transition-all"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
          {!accessToken && (
            <li>
              <Link
                className="text-xs text-white hover:text-slate-200 active:text-slate-100 transition-all  "
                to="/register"
              >
                Register
              </Link>
            </li>
          )}
          {accessToken && (
            <li>
              <span
                className="text-xs text-white hover:text-slate-200 active:text-slate-100 transition-all cursor-pointer"
                onClick={logoutApi}
              >
                Logout
              </span>
            </li>
          )}
          <li className="relative group">
            <Link>
              <img
                src={
                  user?.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                }
                alt="profil-img"
                className="w-[25px] h-[25px] rounded-full border-2 border-transparent hover:border-green-800 active:border-green-700 transition-all"
                onError={(e) => {
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"; // Placeholder URL
                }}
              />
            </Link>
            <span className="absolute -left-5 -bottom-8 text-xs bg-gray-800 text-white p-1 rounded hidden group-hover:block transition-all">
              {user?.username}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
