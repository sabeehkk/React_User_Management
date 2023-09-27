import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from "react-router-dom";


export default function Adduser() {
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
                navigate('/admin/users');
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
    <div>
    <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
            <a href="/">
                <h3 className="text-4xl font-bold text-black-600">
                   Add User
                </h3>
            </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
        <form onSubmit={handleSumbit}>
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 undefined"
                    >
                        Name
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                      />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 undefined"
                    >
                        Email
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                 />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 undefined"
                    >
                        Password
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter your password"
                           value={password}
                           onChange={(e)=>setPassword(e.target.value)}
                           required
                      />
                    </div>
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="phonenumber"
                        className="block text-sm font-medium text-gray-700 undefined"
                    >
                        PhoneNumber
                    </label>
                    <div className="flex flex-col items-start">
                        <input
                            type="tel"
                            id="phoneNumber"
                             name="phoneNumber"
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter your phone number"
                             value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            required
                     />
                    </div>
                </div>
               
              
                <div className="flex items-center mt-4">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                        Register
                    </button>
                </div>
       {errors && <p className='text-red-600 text-center mt-2'>{errors} &nbsp;</p>}

              
            </form>
            
           
          
        </div>
    </div>
</div>
  )
}
