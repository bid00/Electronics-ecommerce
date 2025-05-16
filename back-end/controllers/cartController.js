import Cart from "../models/cartModel.js";
import mongoose from "mongoose";


 async function calculateTotal(cart) {
      await cart.populate("items.productId", "name price picture");
    let total=0;
    cart.items.forEach(item => {
      const product = item.productId;
      if (product && product.price) {
        total += product.price * item.quantity;
      }
    });
    cart.total = total;
    await cart.save();
    }
//@desc add new product to cart
//@route /api/cart/add
const addToCart = async (req, res) => {
  const {productId, quantity } = req.body;
  console.log(req.body);
  const user = req.user.id
  try {
    let cart = await Cart.findOne({ userId:user });
    if (!cart) {
      cart = new Cart({ userId:user, items: [] });
    }
    const existingItemIndex = cart.items.findIndex((item) => item.productId == productId);
    
    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity:Number(quantity) });
    }

    await cart.save();
    await calculateTotal(cart);
    


    res.status(200).json({ message: "Cart Updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart", error });
  }
};


//@desc get the products in cart
//@route /api/cart/
const getCart = async (req, res) => {
  const user = req.user.id;
  try {
    const cart = await Cart.findOne({ userId:user }).populate("items.productId","name price picture");
    if (!cart) {
      return res.status(200).json({ cart: { items: [] } });
    }
    if (cart.items.length === 0) {
      return res.status(200).json({ cart });
    }
    cart.items = cart.items.map((item) => ({
      ...item._doc,
      productId: {
        ...item.productId._doc,
        picture: `${req.protocol}://${req.get("host")}${item.productId.picture}`,
      },
    }));
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};


//@desc remove product from cart
//@route /api/cart/remove
const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const user = req.user.id;

  try {
    let cart = await Cart.findOne({ userId: user });

    if (!cart) {
      return res.status(404).json({ message: "No items in cart" });
    }
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    await calculateTotal(cart);
    const updatedCart = await Cart.findOne({ userId: user }).populate("items.productId", "name price picture");
    updatedCart.items = updatedCart.items.map((item) => ({
      ...item._doc,
      productId: {
        ...item.productId._doc,
        picture: `${req.protocol}://${req.get("host")}${item.productId.picture}`,
      },
    }));
    res.status(200).json({ message: "Item removed successfully", cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item", error });
  }
};


//@desc update product quantity in cart
//@route /api/cart/update-quantity
const updateQuantity = async (req, res) => {
  const {productId, quantity } = req.body;
  const user = req.user.id;
  console.log(productId);
  if (!productId || quantity == null) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    let cart = await Cart.findOne({ userId:user });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const product = cart.items.find((item) => item.productId == productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found in cart" });
    }

    product.quantity = Number(quantity);
    await cart.save();
    await calculateTotal(cart);
    cart = await Cart.findOne({userId:user}).populate("items.productId","name price picture")
    cart.items = cart.items.map((item) => ({
      ...item._doc,
      productId: {
        ...item.productId._doc,
        picture: `${req.protocol}://${req.get("host")}${item.productId.picture}`,
      },
    }));
    res.json({ message: "Quantity updated successfully", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating quantity", error });
  }
};

export { addToCart, removeFromCart, getCart, updateQuantity };