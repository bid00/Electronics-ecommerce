import { connect } from "mongoose";

const mongoUrl = "mongodb://localhost:27017/HNUElectronics"
const connectDB = async () => {
    try {
        await connect(mongoUrl,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB connected");
        
    } catch (error) {
        console.error('error connecting to MongoDB',error.messsage);
        process.exit(1);
    }
    
}

export default connectDB;