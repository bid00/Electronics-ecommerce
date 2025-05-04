import mongoose, { Schema, model } from "mongoose";

const orderSchema = new Schema({
  orderNumber:{type:Number},
  userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
  email: { type: String, required: true },
  shippingAddress: [
    {
      streetNum:{type:String,required:true},
      apartment:{type:String,required:true},
      city:{type:String,required:true},
      zipCode:{type:String,required:true},
      country:{type:String,required:true}
    }
  ],
  phone: { type: String, required: true },
  cartId:{type: mongoose.Schema.Types.ObjectId,ref:"Cart",required:true},
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "Pending" },
  date:{type:Number , default:Date.now()}
}, { timestamps: true });

export default model("Order", orderSchema);
