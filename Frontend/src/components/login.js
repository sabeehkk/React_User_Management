import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userAuth";
import { Link, useNavigate } from "react-router-dom";
import userIsLogin from "../customHook/userisLogin";


export default function Login() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [err,setErr]=useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  userIsLogin()

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(email ==='' || password===''){
        setErr('Please fill in all fields')
        return;
    }
    try {
        await axios.post('http://localhost:3000/login',{email, password})
        .then((res)=>{
            console.log(res,'ressssss');
            if(res.data.message==='success'){
              alert(res.data.message)
              dispatch(setUser({user: res.data.userData, token:res.data.token }))
              const token = res.data.token;

              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              
              console.log('token', token);
              localStorage.setItem('token', token);
              navigate('/');
            }else{
              setErr(res.data.message);
            }
        })
    } catch (error) {
        console.log(error);
    }
}
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-600">
            Username:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            // className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-blue-100"
          >
            Login
          </button>
           <Link to="/signup" className="mt-3">Sign Up</Link>
        </div>
        {err && <p className='text-red-600 text-center mt-2'>{err} &nbsp;</p>}

      </form>
    </div>
  </div>
  )
}
