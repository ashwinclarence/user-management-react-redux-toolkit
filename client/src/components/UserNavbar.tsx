import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { onLogout } from "../features/user/userSlice";

export const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const handleLogout = async () => {
    try {
      let response = await axiosInstance.post("/api/logout", {});

      if (response.data) {
        toast.success(response.data.message);
        dispatch(onLogout());
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Logo
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/home"
                className="block py-2 px-3 text-blue-700 bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block py-2 px-3 text-blue-700 bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
              >
                Profile
              </Link>
            </li>
            {isLogin ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block py-2 px-3 text-blue-700 bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-blue-700 bg-blue-700 rounded md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
