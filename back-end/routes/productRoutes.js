import Router from "express";
import { createProduct, getProduct,getProducts } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";
const router = Router();

router.get("/",getProducts);
router.get("/:id",getProduct);
router.post("/add",upload.single("picture"),createProduct);

export default router;

