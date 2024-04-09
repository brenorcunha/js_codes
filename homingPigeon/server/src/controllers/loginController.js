const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const validateToken = require("../auth.js");
const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.home = async (req, res) => {
  if (!validateToken || validateToken == null) res.redirect("/login");
};

exports.register = async (req, res) => {
  var user = await User.findOne({ username: req.body.username });
  if (user) {
    res.status(400).send({ message: "User already exists!" });
    return ;
  } else {
    user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await user.save();

    const token = jwt.sign(
      { id: user.id },
      "brenorc",
      { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 } //24hours
    );
    return res
    .status(200)
    .header("auth-token", token)
    .send({ id: user.id, username: user.username, accessToken: token });
  }
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!user || user == null) {
    res.status(404).send({ message: "Sorry... Username not found." });
    return;
  } else if (!validPassword || validPassword == null) {
    res.status(401).send({ accessToken: null, message: "Invalid password." });
    return;
  } else {
    const token = jwt.sign(
      { id: user.id },
      "brenorc",
      { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 } //24hours
    );
    return res.header("auth-token", token).json(token).status(200);
    //.send({ id: user._id, username: user.username, accessToken: token });
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been logged out." });
  } catch (error) {
    return next(error.message);
  }
};
