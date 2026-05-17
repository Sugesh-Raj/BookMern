const Order = require("./order.model");

// Create Order
const createAOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

// Get Order By Email
const getOrderByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    console.log("Fetching orders for:", email);

    // ✅ Correct way
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
  updateOrderStatus,
};
