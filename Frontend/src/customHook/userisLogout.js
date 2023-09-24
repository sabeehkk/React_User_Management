import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const useIsLogout = ()=>{
    const {success} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if (!success){
            navigate('/login');
        }
    });
}

export default useIsLogout;
