import User from "../model/userModel.js";

export const fetch = async (req, res) => {
  try {

    const users = await User.find();
    if (users.length === 0){
        return res.status(404).json({message: "user not found"});

        
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: " user already exist" });
    }

    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
  }
};

export const update = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message:"user not found"});
             }

             const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true})
             res.status(200).json(updatedUser);

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}



export const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id;
        const userExist = await User.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message:"user not found"});
             }
            await User.findByIdAndDelete(id);
            res.status(200).json({message: "user deleted successfully."});

    }
    catch(error){
        res.status(500).json({message: "Internal server error"});

    }

}