const { Paynow } = require("paynow");
const { v4: refrence } = require("uuid");
const integration = async (req, res) => {
  const ref = refrence();
  let paynow = new Paynow(18643, "c7bd2623-9f65-48f6-bd77-0819f080cad1");
  paynow.resultUrl = "http://localhost:3001/payment/status";
  paynow.returnUrl = "http://localhost:5173/";
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
const notification = (req, res) => {
  console.log(req.body);
  res.status(200).json({ Result: "OK" });
};
const status = (req, res) => {
  console.log("Status send here");
  console.log(req.body);
};
module.exports = { integration, notification, status };
