import mongoose from "mongoose";
import bcrypt from "bcrypt";



const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        validate:{
            validator: function(email){
                const emailRegx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                return emailRegx.test(email);
            },
            message: " email form is invalid"
        },
    },
    password:{
        type:String,
        required: true,
       minlength:8,
    },
    confirmPassword:{
        type:String,
        required: true,
        validate: {
            validator: function( confirmPassword){
                return  confirmPassword === this.password;
            },
            message: "password not matched",
        },
    },
});


userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")) return next();


    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(user.password, salt);

        user.password = hashedPwd;
        next();
    } catch (error) {
        console.log(error);
    }
})


userSchema.pre("save", function(next){
    if(this.isModified("password")){
        this.confirmPassword = undefined;
    }
    next();
})

export default mongoose.model("user", userSchema);