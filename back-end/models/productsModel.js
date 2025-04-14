import { Schema, model } from "mongoose";
import { type } from "os";
import { features } from "process";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category:{
    type:String,
  },
  price: {
    type: Number,
    required: true,
  },
  picture:{
    type:String,
    required:true
  },
  description: {
    type: String,
  },
  features:{
    type:String,
  },
  package:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model("Product", ProductSchema);

export default Product;
