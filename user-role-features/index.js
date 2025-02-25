import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import route from "./routes/userRoute.js"


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/user/api", route);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(()=>{
console.log("db connected successfully");
}).catch(error=> error);



app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
});