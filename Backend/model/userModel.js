import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    status:{
      type :Boolean,
      default:true
    },
    image : {
     type : String,
     default : null
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
