import mongoose from "mongoose";

function dbConnect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/reactCrud")
    .then((result) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log(err , "db");
    });
}
 

export default dbConnect;


 