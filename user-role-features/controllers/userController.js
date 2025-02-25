import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    // console.log(newUser);
    const { email } = newUser;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "user does not exist" });
    }


    const isValidPassword = await bcrypt.compare(password, userExist.password);
    if(!isValidPassword){
        return res.status(400).json({ message: "password is invalid" });
    }


    const token = jwt.sign({userId : userExist._id},process.env.SECRET_KEY, {expiresIn: "1h"});
    res.cookie("token", token, {maxAge: 3600000});
    res.status(200).json({messge:"user Logged In succesfully"});
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};



export const getUserProfile =  async(req,res)=>{
  try{
    const user =  await User.find().select("-password");
  res.status(200).json(user);
  }catch(error){
    res.status(500).json({ message: "Server error" });
  }
 


}