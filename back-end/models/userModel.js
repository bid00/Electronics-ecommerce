import mongoose, { model } from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    uName:{
        type: String,
        required:true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        default:"",
    },
    picture:{
        type:String,
        default:"",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('Users',userSchema);

export default User;