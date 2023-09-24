import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";


const useAdminIsLogout = ()=>{
    const {success} = useSelector((state)=> state.adminAuth);
    const navigate = useNavigate();

    useEffect(()=>{
        if (success){
            navigate('/admin/dashboard');
        }
    })
}

export default useAdminIsLogout;