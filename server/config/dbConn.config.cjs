const mongoose = require("mongoose");
const conn = async () => {
  //process.env.DB_URL
  try {
    await mongoose.connect("mongodb://localhost:27017/mikelarry");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conn;
