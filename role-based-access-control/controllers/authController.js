import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res)=>{

    try {
        const { username, password, role} = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({username, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({message: `user registered with username of ${username}`});
        
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
 
}

export const login = async (req, res)=>{
try {
    const { username, password} = req.body;
    const user = await User.findOne({ username });
    

    if(!user){
        console.log("User not found:");
        return res.status(400).json({ message: "user not found"});
    }

 

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return res.status(401).json({ message: "password is invalid" });
      }


      const token = jwt.sign({id:user._id, role: user.role}, process.env.SECRET_KEY, {expiresIn: "1h"});
      res.status(200).json({token});


} catch (error) {
    res.status(500).json({message:"internal server error"});
}
  
   
}