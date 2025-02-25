import User  from "../model/userModel.js";


export const signup = async(req,res)=>{
    try{
 const userData = new User(req.body);

 const savedUser = await userData.save();

 res.status(200).json(savedUser);


}catch(error){
        res.status(500).json({message: "internal server error"});
    }
}

