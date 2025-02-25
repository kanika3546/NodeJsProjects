import express from "express";
import { login, signup , logout , update } from "../controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const route = express.Router();

route.post("/signup", signup);
route.post("/login", login);
route.get("/logout", logout);

route.put("/update/:id",authMiddleware, update);
route.get("/",(req,res)=>{
 res.json("hello");
})

export default route;


