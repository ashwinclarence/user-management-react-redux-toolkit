import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {  setLoading } from "../features/admin/manageUserSlice";
import axiosInstance from "../lib/axios";
import { UserNavbar } from "./UserNavbar";

const UserLogin = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
    
    // use the store
    const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUserLogin =async (e: React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();
        
        dispatch(setLoading(true));

        if (loginDetails.username.trim() === '' || loginDetails.password.trim() === '') {
            toast.error("Invalid login details");
            return;
      }
      
      // check user exist

      let response = await axiosInstance.post('/api/login', { email: loginDetails.username, password: loginDetails.password });

      if (response.data.success) { 
        toast.success("login successful");
        navigate('/home');
      }

      
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
    } finally {
        dispatch(setLoading(false));
    }
  }

  return (
    <>
      <UserNavbar />
      <div className="flex items-center justify-center min-h-screen ">
        <form className="bg-white shadow-lg border rounded-lg p-8 w-96">
          <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Login</h2>
          <input
            type="text"
            className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Username"
            required
          />
          <input
            type="password"
            className="border w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold rounded-md p-3 w-full hover:bg-blue-700 transition duration-200 ease-in-out"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default UserLogin;
