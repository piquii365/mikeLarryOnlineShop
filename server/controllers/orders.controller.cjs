const Orders = require("../models/oders.cjs");
const getOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    if (orders) {
      res.status(200).json({ status: true, Orders: orders });
    } else {
      res.status(200).json({ status: false, Result: "No Orders Available" });
    }
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
    console.error(error);
  }
};
const handleDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Orders.find({ _id: id });
    if (result) {
      const response = await Orders.deleteOne({ _id: id });
      res.status(200).json({ status: true });
    } else {
      res.status(203).json({ status: false, result: "Order does not exist" });
    }
  } catch (error) {
    res.status(404).json({ status: false, error: "Internal Server Error" });
    console.error(error);
  }
};
module.exports = { getOrders, handleDelete };
