
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const order = await Order.create({
    restaurantId: req.body.restaurantId,
    tableNumber: req.body.tableNumber,
    items: req.body.items,
    status: "placed"
  });
  res.json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({
    restaurantId: req.user.restaurantId
  }).sort({ createdAt: -1 });

  res.json(orders);
};
