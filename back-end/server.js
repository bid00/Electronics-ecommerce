import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import connectDB from "./config/dbconnect.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import autho from "./middlewares/authoMiddleware.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";

const app = express();
config();

const PORT = process.env.PORT || 8080;


//@desc server uploads
app.use("/uploads", express.static("uploads"));
app.use(express.json());
corsMiddleware(app);

connectDB();
app.use(logger);
app.use("/api/auth",authRoutes);
app.use("/api/user",autho,userRoutes);
app.get("/",(req,res)=>{
    res.send("home");
})
app.use("/api/products",productRoutes);



app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
})  