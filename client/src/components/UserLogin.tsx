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
      <UserNavbar/>
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleUserLogin}
        className="flex border rounded-md p-6 flex-col gap-6"
        >
              <h2 className="text-4xl text-center">Login Form user</h2>
        <input
          type="text"
          className="border w-full p-2"
          value={loginDetails.username}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, username: e.target.value })
          }
          placeholder="username"
          />
        <input
          type="password"
          className="border w-full p-2"
          value={loginDetails.password}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
                  placeholder="password"
        />
        <button type="submit" className="bg-blue-500 rounded-md p-2 ">Login</button>
        <p>Dont have an account <Link to='/signup' className="text-blue-800 font-bold" >Sign up</Link></p>
      </form>
    </div>
          </>
  );
};

export default UserLogin;
