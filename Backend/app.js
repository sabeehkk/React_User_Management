import "dotenv/config";
import bodyParser from "body-parser";

import express from "express";

import cors from "cors";

import cookieParser from "cookie-parser";
import dbConnect from "./config/config.js";
import userRoute from "./routes/userRoute.js";
import adminRoute from './routes/adminRoute.js'

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


// app.use(cors());

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.static('public'))
dbConnect();

app.use('/',userRoute);
app.use('/admin',adminRoute)

const port = process.env.PORT;
app.listen(port || 5000, () => {
  console.log(`server running ${port}`);
});
