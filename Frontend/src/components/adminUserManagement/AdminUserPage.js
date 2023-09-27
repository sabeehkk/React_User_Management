import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUsersData, DeleteUser, FilterUsers, ChangeAccess } from '../../redux/usersSlice';
import { Link } from "react-router-dom";
import useAdminIsLogin from '../../customHook/adminisLogin';
const AdminUsersPage = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const { users , FilterData} = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = (e)=>{
    setSearchQuery(e.target.value);
    dispatch(FilterUsers(e.target.value));
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
        <Link to='/admin/adduser' ><button className="rounded-md m-3 px-4 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400">
          Add User
        </button></Link>
        <h1 className="text-2xl font-semibold mb-4">Users List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e)=> handleSearch(e)}
            placeholder="Search by username"
            className="rounded-l-md flex-1 py-2 px-4 border-t border-b border-l text-gray-800 bg-white border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <button
            className="rounded-r-md px-4 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          >
            Search
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-4">
          {FilterData?.length ==0 ?'User data is not found!': FilterData?.map((item, index) => (
            <div key={item._id} className="border p-4 rounded-md shadow-md">
              <p className="text-green-800 font-semibold mb-1">
                User {index + 1}: {item.username}
              </p>
              <p className="text-gray-600 mb-2">Email: {item.email}</p>
              <div className="flex items-center space-x-4">
                {/* <Link
                  className="text-yellow-600 hover:underline"
                  to={`/admin/viewuserdetails/${item._id}`}
                >
                  View Details
                </Link> */}
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
