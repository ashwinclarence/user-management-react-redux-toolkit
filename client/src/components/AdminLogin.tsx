import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

const AdminLogin = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAdminLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!loginDetails.username || !loginDetails.password) {
        toast.error("Both fields are required");
        return;
      }
      
      let response = await axiosInstance.post('/api/admin/login', loginDetails);

      if (response.data) {
        toast.success(response.data.message);
        navigate("/admin/home");
      }

    } catch (error:any) {
      console.error("Login error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleAdminLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Admin Login
        </h2>

        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 w-full p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={loginDetails.username}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, username: e.target.value })
            }
            placeholder="Username"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="border border-gray-300 w-full p-3 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({ ...loginDetails, password: e.target.value })
            }
            placeholder="Password"
          />
        </div>


        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-lg py-3 text-lg font-semibold hover:bg-blue-600 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
