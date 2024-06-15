const Customers = require("../models/customers.cjs");
const addCustomer = async (req, res) => {
  try {
    const checkCustomer = await Customers.findOne({
      fullName: req.body.fullName,
    }).exec();
    if (checkCustomer) {
      res
        .status(200)
        .json({ status: false, Result: "Customer already exists" });
    } else {
      const values = {
        fullName: req.body.fullName,
        age: req.body.age,
        phoneNumber: req.body.phoneNumber,
        zone: req.body.zone,
      };
      await Customers.insertMany([values]);
      res.status(200).json({ status: true });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: false, Result: "Internal Server Error" });
  }
};
const getCustomers = async (req, res) => {
  try {
    const result = await Customers.find();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Customers.findOne({ _id: id }).exec();
    if (result) {
      await Customers.deleteOne({ _id: id });
      res.status(200).json({ status: true });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: false, Result: "Internal Server Error" });
  }
};
module.exports = { addCustomer, getCustomers, deleteCustomer };
