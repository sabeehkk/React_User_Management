import React, { useState } from 'react';
import useIsLogout from '../customHook/userisLogout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserProfile() {

  useIsLogout()

    const {user}=useSelector((state)=>state?.auth)
  console.log(user,'userrrrrrrrrrrrrrrrrrr');

  return (
<div className="bg-gray-100 min-h-screen">
  <main className="max-w-3xl mx-auto py-8 px-4">
    <div className="bg-blue-800 shadow p-6 rounded-lg"> {/* Change the background color here */}
      <div className="bg-white shadow p-6 rounded-lg">
        <div className="flex items-center">
          {/* {image ? <img className="w-20 h-20 rounded-full" src={URL.createObjectURL(image)} alt="posts" /> : */}
          {/* <img className="w-20 h-20 rounded-full" src={'http://localhost:3000/images/'+user?.image} alt="posts" />  */}
          <img className="w-20 h-20 rounded-full" src={user?.image ? 'http://localhost:3000/images/'+user?.image :'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?w=2000'} alt="posts" /> 
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user?.name}</h2>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phoneNumber}</p>
        </div>
        <div className="mt-4">
          <Link to={`/editprofile/${user?._id}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  </main>
  
</div>

  )
}

export default UserProfile