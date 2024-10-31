import { useEffect, useState } from "react";
import { UserNavbar } from "./UserNavbar";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    id:''
  })

  const navigate = useNavigate();

  useEffect(() => {
    getProfileDetails();
  },[])


  const getProfileDetails = async() => {
    try {
    
      let response = await axiosInstance.post('/api/get-profile');

      if (response.data) {
        toast.success(response.data.message);
        setUserDetails({email:response.data.user.email,name:response.data.user.name,id:response.data.user.id})
      }
    
  } catch (error:any) {
    console.log(error);
      toast.error(error.message);
      navigate('/home');
    } finally {
      setLoading(false);
  }
  }
  

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <h1>Loading...</h1>
    </div>
  }


  return (
    <>
      <UserNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="/docs/images/people/profile-picture-3.jpg"
              alt={userDetails.name}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {userDetails.name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
             {userDetails.email}
            </span>
            <div className="flex mt-4 md:mt-6">
              <button
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Upload Profile Picture
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
