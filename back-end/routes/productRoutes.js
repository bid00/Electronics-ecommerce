import Router from "express";
import { getProduct,getProducts } from "../controllers/productController.js";
const router = Router();

router.get("/:id",getProduct);

export default router;

