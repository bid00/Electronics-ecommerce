import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import connectDB from "./config/dbconnect.js";
import productRoutes from "./routes/productRoutes.js"
const app = express();
config();

const PORT = process.env.PORT || 8080;


app.use(express.json());

connectDB();
app.use(logger);
app.use("/api/auth",authRoutes);
app.get("/",(req,res)=>{
    res.send("home");
})
app.use("/api/products",productRoutes);



app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
})  