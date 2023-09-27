import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const  userRegister= async(req,res)=>{
    try{
      const {name, email, phoneNumber, password} = req.body ;
      console.log(req.body);
      const existUser = await userModel.find({email,phoneNumber})
      if(existUser.length !==0){
            return res.json({message:'User Already exists'})
      }
      const hashedPassword = await bcrypt.hash(password,10)

      const user=new userModel({name,email,phoneNumber,password:hashedPassword})
      res.json({message:'success'})

      await user.save()
    }catch(error){
        console.log(error.message);
    }
}

const Login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        console.log(req.body,'dataaaaaa');
        const userData =await userModel.findOne({email})
        // console.log(userData);
        if(!userData){
            return res.json({message:'user is not found'})
        }
        if(userData.status==false){
            return res.json({message:'user is blocked by admin'})
        }
        if(userData.status===false){
            return res.json({message:'user is blocked'})
        }
       const userValid = bcrypt.compareSync(password,userData.password) 
       
       if(!userValid){
            return res.json({message:'password is incorrect'})
       }
       const KEY = process.env.SECRET_KEY;
       console.log('hashh 88',KEY)

       const token = jwt.sign({user:email,role:'user'},KEY,{expiresIn:'1h'})
       console.log('hashh ',token)                                                                      
       return res.json({message:'success',token,userData})
    }catch(error){
        console.log(error.message);
    }
}

const EditProfile = async (req, res)=>{
    console.log('profile edittttttttttttt');
    try {
        console.log(req.body,'dataaaaaaaaaaaaaaa');
        // console.log(req.file,'backend imageee');
        const {username, email, phoneNumber, id} = req.body;
        let image = req.file ? req.file.filename : req.body.image;
        console.log('imageeeeeeeeeeeeeeeeeeeeeeeeeee',req);
        await userModel.updateOne({_id: id}, {$set:{name:username, email, phoneNumber, image:image}})
        .then((result)=>{ 
            console.log(result);
            return res.json({message:'success', image});
        })
        .catch((err)=>{
            return res.json({message:'error'});
        })
    } catch (error) {
        console.log(error);
    }
}


export {  
    userRegister,
    Login,
    EditProfile,
}