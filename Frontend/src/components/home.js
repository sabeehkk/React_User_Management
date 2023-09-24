import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function Home() {
  const { success } = useSelector((state) => state?.auth);
    const presetKey = "p2bwkmow";
    const cloudName = "dglfnmf0x";
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
  return (
     <div className="bg-gradient-to-r from-blue-500 to-blue-300 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our Website
        </h1> 
        <p className="text-gray-600 text-lg mb-6">
          Discover amazing content and services.
        </p>
        <a
          href="#learn-more"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          Learn More
        </a>
      </div>
    </div>
    
  )
}
