import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { configDotenv } from 'dotenv';
configDotenv();

const accessTokenSecret = process.env.SECRET ;



//@desc register new user and add to database
//@route POST /api/auth/signup
const register = async (req,res)=>{
    try {
        const {name, uName, phone , email, password }=req.body;
        console.log(req.body)
        if (!name ||!uName|| !email ||!password ||!phone) {
            return res.status(422).json({message: "please fill in all fields"});
        }

        let user = await User.findOne({email}||{uName});
        if(user){
           return res.status(400).json({message: "Account with same Email or Username exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({name,uName,phone,email,password:hashedPassword});
        await user.save();
        res.status(201).json({message: "User registered Successfully"});

        
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}

//@desc login user
//@route POST /api/auth/login
const login = async (req,res)=>{
    try {
        const {uName,password} = req.body;
        console.log(req.body);
        if (!uName || !password) {
            return res.status(422).json({message:"Please fill in all the fields"})
        }
        const user = await User.findOne({uName});
        if (!user) {
            return res.status(401).json({message: "Username or password is invalid"})   
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if (!passwordMatch) {
            return res.status(401).json({message: "Username or password is invalid"})
        }

        const accessToken = await jwt.sign({userId :user._id},accessTokenSecret);
        return res.status(200).json({accessToken})
    } catch (error) {
        return res.status(500).json({message : error.message});

    }
}

export {register,login} ;