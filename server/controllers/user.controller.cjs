const { default: users } = require("../models/users.cjs");
const Users = require("../models/users.cjs");
const subscription = async (req, res) => {
  try {
    const { email } = req.body;
    const isMember = await Users.findOne({ email: email }).exec();
    if (isMember) {
      await Users.findOneAndUpdate(
        { email: email },
        { $set: { subscription: true } }
      );
      res.status(200).json({ status: true });
    } else {
      res.status(200).json({
        status: false,
        Result: "You need to be a member to Subscribe",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, Result: "internal Server Error" });
  }
};
module.exports = { subscription };
