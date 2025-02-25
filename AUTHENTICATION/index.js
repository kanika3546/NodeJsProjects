import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import route from "./routes/userRoute.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", route);


const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(()=>{
console.log("db connected successfuly");
}).catch(error=> console.log(error));






const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res)=>{
   console.log(`server is running on ${PORT}`);
})