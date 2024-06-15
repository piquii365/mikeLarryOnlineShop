const Admin = require("../models/Admin.cjs");
const Users = require("../models/users.cjs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const addAdmin = async (req, res) => {
  try {
    const values = {
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      fullName: req.body.fullName,
    };
    const isAvailable = await Admin.findOne({
      $or: [{ username: values.username }, { email: values.email }],
    }).exec();
    if (isAvailable) {
      res.status(200).json({
        status: false,
        Result: "Username or Password already registered",
      });
    } else {
      await Admin.insertMany([values])
        .then((result) => {
          res.status(201).json({ status: true, Result: result });
        })
        .catch((error) => {
          res.status(200).json({ status: false, Result: "Bad request" });
        });
    }
  } catch (error) {
    res.status(503).json({ status: false, Result: "Internal server error" });
  }
};
const addUser = async (req, res) => {
  try {
    const values = {
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
      email: req.body.email,
      fullName: req.body.fullName,
      address: req.body.location,
      phoneNumber: req.body.phoneNumber,
    };
    const isAvailable = await Users.findOne({
      $or: [{ username: values.username }, { email: values.email }],
    }).exec();
    if (isAvailable) {
      res.status(200).json({ status: false });
    } else {
      await Users.insertMany([values]);
      res.status(201).json({ status: true });
    }
  } catch (error) {
    res.status(503).json({ status: false, Result: "Internal server error" });
  }
};
const signAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      $or: [{ username: req.body.email }, { email: req.body.email }],
    }).exec();
    if (admin) {
      if (await bcrypt.compare(req.body.password, admin.password)) {
        const payload = {
          username: admin.username,
        };
        const accessToken = jwt.sign(
          payload,
          process.env.SECRETE_ACCESS_TOKEN,
          {
            expiresIn: "15m",
          }
        );
        const refreshToken = jwt.sign(
          payload,
          process.env.SECRETE_REFRESH_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        await Admin.updateOne(
          { _id: admin._id },
          {
            $set: {
              refreshToken: { token: refreshToken, createdAt: Date.now() },
            },
          }
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          status: true,
          username: admin.username,
          accessToken: accessToken,
        });
      } else {
        res.status(200).json({ status: false, Result: "Incorrect password" });
      }
    } else {
      res
        .status(200)
        .json({ status: false, Result: "Username or email not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, Result: "Internal Server Error" });
  }
};
const signUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      $or: [{ username: req.body.email }, { email: req.body.email }],
    }).exec();
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const payload = {
          username: user.username,
        };
        const accessToken = jwt.sign(
          payload,
          process.env.SECRETE_ACCESS_TOKEN,
          {
            expiresIn: "15m",
          }
        );
        const refreshToken = jwt.sign(
          payload,
          process.env.SECRETE_REFRESH_TOKEN,
          {
            expiresIn: "1d",
          }
        );
        await Users.updateOne(
          { _id: user._id },
          {
            $set: {
              refreshToken: { token: refreshToken, createdAt: Date.now() },
            },
          }
        );
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          status: true,
          username: user.username,
          accessToken: accessToken,
        });
      } else {
        res.status(403).json({ status: false, Result: "Incorrect password" });
      }
    } else {
      res
        .status(200)
        .json({ status: false, Result: "Username or email not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, Result: "Internal Server Error" });
  }
};
const logoutAdmin = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
      res.sendStatus(204);
    } else {
      const refreshToken = cookie.jwt;
      const tokenBearer = await Admin.findOne({
        refreshToken: { token: refreshToken },
      }).exec();
      if (!tokenBearer) {
        res.clearCookie("jwt", { httpOnly: true });
        res.sendStatus(204);
      } else {
        await Admin.findOneAndUpdate(
          { refreshToken: { token: refreshToken } },
          { $set: { "refreshToken.token": "" } }
        );
        res.clearCookie("jwt", { httpOnly: true });
        res.sendStatus(204);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Result: "Internal Server Error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
      res.sendStatus(204);
    } else {
      const refreshToken = cookie.jwt;
      const tokenBearer = await Users.findOne({
        refreshToken: { token: refreshToken },
      }).exec();
      if (!tokenBearer) {
        res.clearCookie("jwt", { httpOnly: true });
        res.sendStatus(204);
      } else {
        await Users.findOneAndUpdate(
          { refreshToken: { token: refreshToken } },
          { $set: { "refreshToken.token": "" } }
        );
        res.clearCookie("jwt", { httpOnly: true });
        res.sendStatus(204);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Result: "Internal Server Error" });
  }
};
const refreshAdmin = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
      res.sendStatus(401);
    } else {
      const refreshToken = cookie.jwt;
      const tokenBearer = await Admin.find({
        refreshToken: { token: refreshToken },
      });
      if (!tokenBearer) {
        res.sendStatus(403);
      } else {
        jwt.verify(
          refreshToken,
          process.env.SECRETE_REFRESH_TOKEN,
          (err, decoded) => {
            if (err || decoded.username !== decoded.username) {
              res.sendStatus(403);
            } else {
              const payload = {
                username: decoded.username,
              };
              const accessToken = jwt.sign(
                payload,
                process.env.SECRETE_ACCESS_TOKEN,
                {
                  expiresIn: "15m",
                }
              );
              res.status(200).json({ accessToken });
            }
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Result: "Internal Server Error" });
  }
};
const refreshUser = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.jwt) {
      res.sendStatus(401);
    } else {
      const refreshToken = cookie.jwt;
      const tokenBearer = await Users.find({
        refreshToken: { token: refreshToken },
      });
      if (!tokenBearer) {
        res.sendStatus(403);
      } else {
        jwt.verify(
          refreshToken,
          process.env.SECRETE_REFRESH_TOKEN,
          (err, decoded) => {
            if (err || decoded.username !== decoded.username) {
              res.sendStatus(403);
            } else {
              const payload = {
                username: decoded.username,
              };
              const accessToken = jwt.sign(
                payload,
                process.env.SECRETE_ACCESS_TOKEN,
                {
                  expiresIn: "15m",
                }
              );
              res.json({ accessToken });
            }
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ Result: "Internal Server Error" });
  }
};
module.exports = {
  addAdmin,
  signUser,
  addUser,
  signAdmin,
  logoutUser,
  logoutAdmin,
  refreshAdmin,
  refreshUser,
};
