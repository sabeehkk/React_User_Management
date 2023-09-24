import { useDispatch } from "react-redux";
import { logout } from "../../src/redux/adminAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function AdminLogout(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/admin');
        return ()=>{
            dispatch(logout());
        }
    })
}

export default AdminLogout;