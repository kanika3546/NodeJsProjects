import jwt from "jsonwebtoken";

export const authMiddleware = async(req,res, next)=>{
    const token = req.cookies.token;
  if(!token) return res.status(400).json({message: "unauthorized access"});
try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken.userId;
    next();


} catch (error) {
    res.status(401).json({ message: "Invalid token" });
}



}

export default authMiddleware;