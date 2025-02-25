import jwt from "jsonwebtoken";


const verifyToken = async(req,res,next)=>{
 let token;
 let authHeader = req.headers.Authorization ||  req.headers.authorization ;


 if(authHeader && authHeader.startsWith("Bearer")){
    token = authHeader.split(" ")[1];


    if(!token){
        return res.status(401).json({ message: "No token, so authorization denied"});
    }


try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    console.log("the decoder user is ", req.user);
    next();
} catch (error) {
    res.status(400).json({ message: "token is invalid "});
}

 }else{
    res.status(401).json({ message: "no token , unauthorized"});
 }
}

export default verifyToken;