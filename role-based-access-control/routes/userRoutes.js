import express from "express";
import verifyToken from "../middlewares/authMiddleware.js";
import authorizeRoles from "../middlewares/roleMiddleware.js";


const route = express.Router();


//only admin can access this router
route.get("/admin",verifyToken, authorizeRoles("admin"), (req,res)=>{
    res.json({message:"welcome Admin"});
});

//only admin and manager can access this router
route.get("/manager",verifyToken,authorizeRoles("admin", "manager"), (req,res)=>{
    res.json({message:"welcome Manager"});
});

//all can access this router
route.get("/user",verifyToken, authorizeRoles("admin", "manager", "user"), (req,res)=>{
    res.json({message:"welcome User"});
});

export default route;