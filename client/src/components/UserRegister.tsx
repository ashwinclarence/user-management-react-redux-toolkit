import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import { UserNavbar } from "./UserNavbar";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
    
    const navigate = useNavigate();

  const handleRegister = async(e: React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault();

        console.log(formData)


        if (formData.email.trim() === '' || formData.name.trim() === '' || formData.password.trim() === '') {
            toast.error("All field are required");
            return;
        }
        
        // call the backend route using axios
        let response = await axiosInstance.post('/api/signup', formData);

        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/');
        } else {
            toast.error("this is a failed response",response.data.message);
        }


    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <UserNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen ">
    <form
      onSubmit={handleRegister}
      className="bg-white shadow-lg rounded-lg p-8 w-96 flex flex-col gap-6 border"
    >
      <h2 className="text-center text-4xl font-semibold text-gray-800">Sign Up</h2>
      
      <input
        type="text"
        className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter full name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <input
        type="email"
        className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter email address"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      
      <input
        type="password"
        className="border-2 border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter password"
        minLength={6}
        maxLength={20}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      
      <button className="bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200">
        Sign Up
      </button>
      
      <p className="text-center">
        Already have an account? 
        <Link to={'/'} className="text-blue-600 font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
    </>
  );
};

export default UserRegister;
