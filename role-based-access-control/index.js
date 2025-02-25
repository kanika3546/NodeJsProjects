import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import dbConnect from "./config/dbConnect.js";
import authroute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js"
dotenv.config();



dbConnect();
const app = express();


//MIddlewares
app.use(express.json());
// app.use(bodyParser.json());


//Routes
app.use("/api/auth", authroute);
app.use("/api/users", userRoute)
const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>{
 console.log(`server is running at ${PORT} `)
})