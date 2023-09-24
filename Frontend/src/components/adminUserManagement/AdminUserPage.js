import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUsersData, DeleteUser, FilterUsers, ChangeAccess } from '../../redux/usersSlice';
import { Link } from "react-router-dom";
import useAdminIsLogin from '../../customHook/adminisLogin';
const AdminUsersPage = () => {
  const { users , FilterData} = useSelector((state) => state.users);
  useAdminIsLogin();
  useEffect(() => {
    FetchUsers();
  }, []);
  console.log(users ,'users', FilterData,'FilterDatas')
  const dispatch = useDispatch();

  const FetchUsers = async () => {
    try {
      await axios.get('http://localhost:3000/admin/users')
        .then((res) => {
            console.log(res.data.userData,'adminuserpageeeeeee');
          dispatch(setUsersData(res.data.userData));
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log(error);
    }
  }

  const action = async (id, status)=>{
    status =status===true ? false : true;
    try {
      await axios.get(`http://localhost:3000/admin/action/?id=${id}&status=${status}`)
      .then((res)=>{
          if(res.data.message ==='success'){
            dispatch(ChangeAccess({id, status}));
            return;
          }
          alert(res.data.message);
      })
      .catch((error)=>{
          console.log(error,' user status changing');
      })

    } catch (error) {
      console.log(error);
    }
  }
  const Delete = async (id)=>{
    try {
      console.log(id);
      const response = await axios.post('http://localhost:3000/admin/deleteuser', { id });
      dispatch(DeleteUser(id)); 
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Users List</h1>
        <div className="flex mb-4">
        
        </div>
        <ul className="grid grid-cols-1 gap-4">
          {FilterData?.length ==0 ?'User data is not found!': FilterData?.map((item, index) => (
            <div key={item._id} className="border p-4 rounded-md shadow-md">
              <p className="text-green-800 font-semibold mb-1">
                User {index + 1}: {item.username}
              </p>
              <p className="text-gray-600 mb-2">Email: {item.email}</p>
              <div className="flex items-center space-x-4">
                <Link
                  className="text-yellow-600 hover:underline"
                  to={`/admin/viewuserdetails/${item._id}`}
                >
                  View Details
                </Link>
                <button
                  className={`px-4 py-2 rounded ${item.status ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                    }`}
                  onClick={()=> action(item._id, item.status)}
                >
                  {item.status ? 'BLOCK' : 'UNBLOCK'}
                </button>
                <button
                className={`px-4 py-2 rounded ${item.status ? 'bg-red-600 text-white' : 'bg-yellow-500 hover:bg-black-700 text-white'}`}
                  onClick={()=> Delete(item._id)}
                >Delete 
                </button>
              </div>
            </div>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default AdminUsersPage;
