import Login from '../components/login'
import Signup from "../components/signup";
import Home from "../components/home";
import Logout from '../components/logout'
import AdminLogout from '../components/AdminLogout'
import Navbar from '../components/header/Nav'
import AdminNavbar from '../components/headerAdmin/Nav'
import AdminLogin from '../components/adminLogin';
import AdminDashboard from '../components/AdminDashboard';
import React, {useEffect} from 'react' ;
import { Route,Routes,useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setAdmin, setUser } from "../redux/store";
import UserTable from "../components/AdminDashboard";
import axios from "axios";
import Profile from '../components/Profile';
import EditUser from '../components/adminUserManagement/Edituser';
import useAdminIsLogin from "../customHook/adminisLogin";
import useIsLogout from "../customHook/userisLogout";
import AdminUserPage from '../components/adminUserManagement/AdminUserPage';
import Adduser from '../components/adminUserManagement/Adduser';
import Viewuserdetails from '../components/adminUserManagement/ViewUserDetails';


export default function AuthWrapper() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  // const userLocalStorage = JSON.parse(localStorage.getItem("users"));

  const user = useSelector((state) => state.auth);
  const admin = useSelector((state) => state.admin);



  return (
    <div>
      {window.location.pathname.startsWith('/admin') ? <AdminNavbar /> : <Navbar />}

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={!user.success?<Signup/>:<Home />}/>
      <Route path='/logout' element={<Logout />}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/editprofile/:id' element={<EditUser IsLogin={useIsLogout}/>}/>


      <Route path='/admin' element={<AdminLogin />}/>
      <Route path='/admin/dashboard' element={<AdminDashboard />}/>
      <Route path='/admin/Logout' element={<AdminLogout />}/>
      <Route path='/admin/users' element={<AdminUserPage/>}/>
      <Route path='/admin/adduser' element={<Adduser/>} />
      <Route path='/edituser/:id' element={<Viewuserdetails/>}/>
    </Routes>
    </div>
  )
}
