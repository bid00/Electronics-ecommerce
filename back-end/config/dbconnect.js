import { connect } from "mongoose";

const mongoUrl = process.env.MONGODB_URL;
const connectDB = async () => {
    try {
        await connect(mongoUrl);
        console.log("MongoDB connected");
        
    } catch (error) {
        console.error('error connecting to MongoDB',error.messsage);
        process.exit(1);
    }
    
}

export default connectDB;