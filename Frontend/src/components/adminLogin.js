import axios from 'axios';
import React, { useState ,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../../src/redux/adminAuth';

import useAdminIsLogout from '../../src/customHook/adminisLogout';

function AdminLogin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
       
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    useAdminIsLogout();

  
    const handleadminLogin = async (e)=>{
        e.preventDefault();
        if (email === '' || password === '') {
          setErr('Please fill in all fields');
          return; 
        }
        // if (password.length<6){
        //   setErr('Password meets the minimum length requirement.')
        //   return;
        // }
        try {
            await axios.post('http://localhost:3000/admin/adminlogin',{email, password})
            .then((res)=>{
              console.log(res.data.message,'ressssssss');
              if (res.data.message==='success'){
                dispatch(setAdmin({admin: res.data.adminData, token: res.data.token}));
                const token = res.data.token;

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                console.log('token', token);

                localStorage.setItem('admintoken', token);
                alert(res.data.message);
                navigate('/admin/dashboard');
                return;
              }
              setErr(res.data.message)
              // alert(res.data.message);
            })
            .catch((err)=>{
              console.log(err);
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-semibold mb-4 text-center">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={handleadminLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </div>
          {err && <p className="text-red-600 text-center mt-2">{err} &nbsp;</p>}
        </form>
      </div>
    </div>
   )
}

export default AdminLogin