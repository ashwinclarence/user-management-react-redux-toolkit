import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="border p-6 rounded-md flex flex-col gap-8"
          >
              <h2 className="text-center text-4xl font-semibold">Sign Up </h2>
        <input
          type="text"
          className="border-2 p-2 rounded-md border-black"
          placeholder="Enter full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          className="border-2 p-2 rounded-md border-black"
          placeholder="Enter email address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          className="border-2 p-2 rounded-md border-black"
          placeholder="Enter password"
          min={6}
          max={20}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
              />
              <button className="border py-2 px-6 rounded-md bg-red-600 text-white">sign up</button>
              <p>already have an account <Link to={'/'} className="text-blue-600 font-semibold">login </Link></p>
      </form>
    </div>
  );
};

export default UserRegister;
