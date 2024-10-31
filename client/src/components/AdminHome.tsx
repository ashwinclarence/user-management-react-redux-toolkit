import { AdminNavbar } from "./AdminNavbar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser } from "../features/admin/manageUserSlice";
import { RootState } from "../app/store";


type UserListType={
  email: string,
  name: string,
  id:string
}

const AdminHome = () => {
 
  const usersList = useSelector((state: RootState) => state.admin.users);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async() => {
    try {

      let response = await axiosInstance.post('/api/admin/get-users');

      if (response.data) {
        // add details to store
        dispatch(addUser(response.data.users));
      }
      
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const handleDelete =async (id: string) => {
    try {

      let response = await axiosInstance.post('/api/admin/delete-user', {id});

      if (response.data) {
        toast.success(response.data.message);
        // store data delete
        dispatch(deleteUser(id));
      }
      
    } catch (error:any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col mt-10 items-center min-h-screen bg-gray-50">
        <h2 className="text-4xl font-semibold text-gray-900 mb-6">User Details</h2>

        <div className="container mx-auto w-full px-4">
          <table className="min-w-full text-sm text-left text-gray-700 shadow-md rounded-lg overflow-hidden">
            <thead className="text-xs uppercase bg-gray-200 text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">Sl</th>
                <th scope="col" className="px-6 py-3">name</th>
                <th scope="col" className="px-6 py-3">email</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => (
                <tr
                  className="bg-white border-b hover:bg-gray-100"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      type="button"
                      className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={()=>handleDelete(user.id)}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
