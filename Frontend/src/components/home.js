import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {withMT} from "@material-tailwind/react/utils/withMT";



export default function Home() {
  const { success } = useSelector((state) => state?.auth);
    const presetKey = "p2bwkmow";
    const cloudName = "dglfnmf0x";
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
  return (
    <withMT className="rounded-xl">
    <img
      src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
      alt="image 1"
      className="h-full w-full object-cover"
    />
    <img
      src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
      alt="image 2"
      className="h-full w-full object-cover"
    />
    <img
      src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
      alt="image 3"
      className="h-full w-full object-cover"
    />
  </withMT>
    
  )
}
