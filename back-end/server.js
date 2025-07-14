import express from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import logger from "./middlewares/logger.js";
import connectDB from "./config/dbconnect.js";
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import autho from "./middlewares/authoMiddleware.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import mailRoutes from "./routes/mailRoutes.js";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
config();

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//@desc server uploads
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

corsMiddleware(app);
connectDB();
app.use(logger);
app.use("/api/auth",authRoutes);
app.use("/api/user",autho,userRoutes);
app.use("/api/cart",autho,cartRoutes);
app.use("/api/order",autho,orderRoutes);
app.use("/api/mail",mailRoutes);
app.use("/api/products",productRoutes);



app.listen(PORT,()=>{
    console.log(`server running on port : ${PORT}`);
})  