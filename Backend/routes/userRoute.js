import express from "express";
import VerifyToken from "../middleware/UserVerifyToken.js";
import upload from '../middleware/multer.js'

import {
    EditProfile,
    Login,
    userRegister,
} from "../controller/user.js";

const router = express.Router();

router.get('/test',VerifyToken,(req, res)=>{
    res.json({success:'true'});
})
router.post('/register',userRegister)
router.post('/login',Login)
router.post('/UserProfileEdit',upload.single('image'), EditProfile)
// router.post("/uploadImage", (req, res) => {
//     console.log('uploadimga',req.body.image);
//     // res.send('haiiiiiiiiii')
//     fileUploader(req.body.image)
//       .then((url) => console.log(url) )
//       .catch((error)=>{
//         console.log(error);
//       });
//   });


export default router;
