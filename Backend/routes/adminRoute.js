import express from "express";
// ,userData,DeleteUser,Dashboard
import {
    Dashboard,
    adminLogin,
    UserData,
    Action,
    DeleteUser
} from "../controller/admin.js";

import VerifyToken from "../middleware/AdminVerifyToken.js";

const router = express.Router();


router.post('/adminlogin',adminLogin)
router.post('/',Dashboard)
router.get('/users', UserData);
router.get('/action',Action)
router.post('/deleteuser',DeleteUser);


export default router;
