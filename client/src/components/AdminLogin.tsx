import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (
        loginDetails.username === "admin@123" &&
        loginDetails.password === "123"
      ) {
        navigate("/admin/home");
      } else {
        toast.error("Invalid login details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleAdminLogin}
        className="flex border rounded-md p-6 flex-col gap-6"
          >
              <h2>Login Form</h2>
        <input
          type="text"
          className="border w-full"
          value={loginDetails.username}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, username: e.target.value })
          }
                  placeholder="username"
        />
        <input
          type="password"
          className="border w-full"
          value={loginDetails.password}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
                  placeholder="password"
        />
        <button type="submit" className="bg-blue-500 rounded-md p-2 ">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
