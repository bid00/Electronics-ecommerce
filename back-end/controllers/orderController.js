import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

//@desc place new order
//@route /api/orders/checkout
const placeOrder = async (req, res) => {
  const { email, phone, paymentMethod, shippingAddress } = req.body;
  const user = req.user.id;

  try {
    // Check if the user's cart exists and is not empty
    const cart = await Cart.findOne({ userId: user });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Validate shippingAddress format
    if (!Array.isArray(shippingAddress) || shippingAddress.length === 0) {
      return res.status(400).json({ message: "Invalid shipping address format" });
    }

    // Count existing orders to generate an incremented order number
    const orderCount = await Order.countDocuments();
    const newOrderNumber = orderCount + 1;

    const newOrder = new Order({
      orderNumber: newOrderNumber,
      userId: user,
      email,
      shippingAddress, // array of objects
      phone,
      cartId: cart._id, // Add the cart ID
      items: cart.items,
      totalAmount:cart.total,
      paymentMethod,
      status: "Pending",
    });

    await newOrder.save();
    await Cart.deleteOne({ userId: user });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error processing order",
      error,
    });
  }
};

// Get user orders
const getUserOrders = async (req, res) => {
  try {
    const user = req.user.id;
    const orders = await Order.find({ userId:user });
    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

export {getUserOrders,placeOrder}