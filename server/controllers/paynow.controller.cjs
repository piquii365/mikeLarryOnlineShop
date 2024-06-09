const { Paynow } = require("paynow");
const { v4: refrence } = require("uuid");
const INTEGRATION_ID = 18643;
const INTEGRATION_KEY = "c7bd2623-9f65-48f6-bd77-0819f080cad1";
const resultUrl = "http://localhost:3001/payment/status";
const returnUrl = "http://localhost:5173/";
const integration = async (req, res) => {
  const ref = refrence();
  let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
  paynow.resultUrl = resultUrl;
  paynow.returnUrl = returnUrl;
  try {
    if (req.body) {
      const { email } = req.params;
      const { item, price, quantity } = req.body;
      let payment = paynow.createPayment(ref, email);
      payment.add(item, price, quantity);
      const result = await paynow.send(payment);
      res.status(200).json(result);
    } else {
      res.status(200).json({ error: "Body cannot be empty" });
    }
  } catch (error) {
    res.status(404).json({ error: "Internal Server Error" });
    console.error(error);
  }
};
const multiplePayments = async (req, res) => {
  try {
    const cartItems = req.body;
    const { email } = req.params;
    if (cartItems) {
      const ref = refrence();
      let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
      paynow.resultUrl = resultUrl;
      paynow.returnUrl = returnUrl;
      let payment = paynow.createPayment(ref, email);
      await cartItems.forEach((item) => {
        payment.add(
          item.name,
          item.discount === 0 ? item.price : item.discount,
          item.quantity
        );
      });
      const result = await paynow.send(payment);
      res.status(203).json(result);
    } else {
      res.status(200).json({ error: true, Result: "No Items Provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Internal Server Error" });
  }
};
const mobilePayment = async (req, res) => {
  try {
    const cartItems = req.body;
    const { email, phoneNumber } = req.params;
    console.log(email, phoneNumber);
    if (cartItems) {
      const ref = refrence();
      let paynow = new Paynow(INTEGRATION_ID, INTEGRATION_KEY);
      paynow.resultUrl = resultUrl;
      paynow.returnUrl = returnUrl;
      let payment = paynow.createPayment(ref, email);
      await cartItems.forEach((item) => {
        payment.add(
          item.name,
          item.discount === 0 ? item.price : item.discount,
          item.quantity
        );
      });
      const result = await paynow.sendMobile(payment, phoneNumber, "ecocash");
      res.status(203).json(result);
    } else {
      res.status(200).json({ error: true, Result: "No Items Provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Internal Server Error" });
  }
};
const notification = (req, res) => {
  console.log(req.body);
  res.status(200).json({ Result: "OK" });
};
const status = (req, res) => {
  console.log("Status send here");
  console.log(req.body);
};
module.exports = {
  integration,
  notification,
  status,
  multiplePayments,
  mobilePayment,
};
