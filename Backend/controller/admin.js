import adminModel from '../model/adminModel.js';         
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../model/userModel.js';

const adminLogin=async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(req.body);
        const adminData =await adminModel.findOne({email})
        if(!adminData){
            return res.json({message:'invalid email or password '})
        }
        const isPasswordCorrect=await bcrypt.compare(password,adminData.password)
        if(!isPasswordCorrect){
            return res.json({message:'password is incorrect'})
        }
       const KEY = process.env.SECRET_KEY;
       const token = jwt.sign({user:email,role:'admin'},KEY,{expiresIn:'1h'})
       return res.json({message:'success',token,adminData})
    }catch(error){
        console.log(error,'admin login error');
    }
}
const UserData=async (req,res)=>{
    try {
        console.log(req.headers);
        const userData=await userModel.find({})
        const userCount = await userModel.countDocuments({});
        const blockedUserCount=await userModel.countDocuments({status:false})
        res.json({userData,userCount,blockedUserCount})
    } catch (error){
        console.log(error.message);
     }
  }
  const Dashboard = async (req, res)=>{
    console.log('admin dashboarddddddd');
    const blockedUserCount = await userModel.countDocuments({status: false})
    const userCount = await userModel.countDocuments({});
    if (userCount || blockedUserCount){
        res.json({blockedUserCount, userCount})
    }
}

const Action =async(req,res)=>{
        const id = req.query.id;
        const status = req.query.status;
        console.log(id, status);
        await userModel.updateOne({_id: id}, {$set: {status: status}})
        .then((result)=>{
            console.log(result);
            res.json({message:'success'});
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const DeleteUser = async (req, res)=>{
        console.log('admin delete user');
        try {
            const id = req.body.id;
            console.log(id);
            const result = await userModel.deleteOne({_id:id});
            if (result.deletedCount === 1){
                console.log(result);
                return res.json({message:'User deleted successfully'});
            }
            console.log(result);
    
            return res.json({message: 'An error occurred'});
        } catch (error) {
            console.log(error);
        }
    }
export {
        adminLogin,
        UserData,
        Dashboard,
        Action,
        DeleteUser
    }