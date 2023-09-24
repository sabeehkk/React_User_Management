import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const useIsLogin = ()=>{
    const {success} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if (success){
            navigate('/');
        }
    });
}

export default useIsLogin;
