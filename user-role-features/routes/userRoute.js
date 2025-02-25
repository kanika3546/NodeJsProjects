import express from "express";
import { registerUser , loginUser, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../authMiddleware.js";


const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get('/profile', authMiddleware,getUserProfile)

export default route;