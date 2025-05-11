import Product from "../models/productsModel.js";
import mongoose from "mongoose";

//@desc Create product with image upload
//@route POST /api/products/add

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const picture = req.file ? `/uploads/products/${req.file.filename}` : null;

    if (!name || !price || !picture) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({ name, price, picture });
    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product", error });
  }
};

//@desc Get all products
//@route GET /api/products
const getProducts = async (req, res) => {
  try {
    const category = req.query.category;

    const products = await Product.find(category?{category}:{}, "name price picture");

    const updatedProducts = products.map(item => ({
      id:item._id,
      name: item.name,
      price: item.price,
      picture: `${req.protocol}://${req.get("host")}${item.picture}`, 
    }));

    res.status(200).json(updatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products", error });
  }
};

//@desc Get one product
//@route GET /api/products/:id
const getProduct = async (req,res)=>{
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findById(id);
    if (!product) {
     return res.status(404).json({message:"product not found"})
    }
    product.picture = `${req.protocol}://${req.get("host")}${product.picture}`;

    return res.status(200).json(product)
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }

}


export { createProduct, getProducts ,getProduct};
