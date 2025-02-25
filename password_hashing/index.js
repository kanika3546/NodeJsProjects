import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import route from "./routes/userRoute.js"

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL= process.env.MONGO_URL;



mongoose.connect(MONGO_URL).then(()=>{
    console.log("db connected successfully")
}).catch(error => console.log(error));



app.use("/api/user", route);


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
});
