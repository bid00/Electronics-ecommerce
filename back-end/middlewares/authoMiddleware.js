import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const SECRET = process.env.SECRET;

//@desc authorize user token 
const autho = async(req,res,next)=>{
    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(401).json({message: "Access token not found"});
    }
    try {
        const decodedAccessToken = jwt.verify(accessToken , SECRET);
        req.user = {id: decodedAccessToken.userId};
        next();
    } catch (error) {
        return res.status(401).json({message:"Access token is invalid or expired"});

        
    }
}

export default autho;