const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const User = db.user;
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getallUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users.length) {
      return res.status(400).json({ error: "Unable to get users." });
    } else {
      res.status(200).json(
        users.map((user) => ({
          _id: user.id,
          username: user.username,
        }))
      );
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

exports.getaUser = (req, res) => {
  User.findOne({
    username: req.body.username,
  }).exec();

  if (error) {
    res.status(500).send({ message: error });
    return;
  }
  if (!user) {
    res.status(400).send({ message: "Sorry... Username not found." });
    return;
  }
  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 } //24hours
  );
  res.header("auth-token", token).json(token);
  res.status(200).send({
    id: user._id,
    username: user.username,
    accessToken: token,
  });
};

exports.deleteaUser = async (req, res) => {
  User.findOne({
    id: req.body.id,
  }).exec();

  if (error) {
    res.status(500).send({ message: error });
    return;
  }
  if (!user) {
    res.status(400).send({ message: "Sorry... Username not found." });
    return;
  }
  try {
    await User.deleteOne({ id });
    res.status(200).send({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};
