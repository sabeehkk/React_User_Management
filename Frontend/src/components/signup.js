import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function Signup() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [name,setName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [errors,setError]=useState([])

    const user=useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const handleSumbit =(e)=>{
        e.preventDefault();
        if(email === '' || password === '' || name === '' || phoneNumber.length === 0){
          setError('Please fill in all fields')
          return;
      }
         if(password.length < 6){
          setError('password is too weak')
        return;
    }
    if(phoneNumber.length !== 10){
      setError('number is wrong');
      return;
  }
        try{
            axios.post('http://localhost:3000/register',{email,password,name,phoneNumber})
            .then((res)=>{
              console.log(res.data.message)
              if (res.data.message ==='success'){
                alert('success');
                navigate('/login');
                return
              }
              alert(res.data.message);
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
            <h2 className="text-3xl font-semibold mb-4 text-center">Sign Up</h2>
            <form onSubmit={handleSumbit}>
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
                  onChange={(e)=>setEmail(e.target.value)}
                //   pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                //   title="Please enter a valid email address"
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
                //   pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$"
                //   title="Password must be at least 4 characters long and contain at least one letter and one number"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600">
                Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                //   pattern="^[A-Za-z\s]{2,}$"
                //   title="Please enter a valid name (minimum 2 characters, letters only)"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600">
                PhoneNumber:
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                //   pattern="^\d{10}$"
                //   title='Enter 10 digits'
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
              {errors && <p className='text-red-600 text-center mt-2'>{errors} &nbsp;</p>}
              <Link to={"/"}>
            <p className="my-2 cursor-pointer text-gray-600 text-center hover:font-semibold">{errors ? `Have an account` : errors}</p>
          </Link>
            </form>
          </div>
        </div>
  )
}
