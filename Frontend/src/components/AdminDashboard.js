import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useAdminIsLogin from '../customHook/adminisLogin';
import { SetUserCount } from '../redux/usersSlice';
import { logout } from "../redux/adminAuth";
import axios from 'axios'

function AdminDashboard() {
  useAdminIsLogin();
  const dispatch = useDispatch()
const {blockedUserCount, userCount} = useSelector((state)=> state.users);
  useEffect(()=>{
    FetchDashboardData();
  },[]);

  const FetchDashboardData = async ()=>{
    console.log('dashboard runninggg');
    try {
      await axios.get('http://localhost:3000/admin/users')
      .then((res)=>{
        console.log(res,'adminDataaaaaaa');
        dispatch(SetUserCount({blockedUserCount: res.data.blockedUserCount,userCount: res.data.userCount }))
      })
      .catch((err)=>{
        dispatch(logout());
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-gray-600">{userCount}</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Blocked Users</h2>
            <p className="text-gray-600">{blockedUserCount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AdminDashboard