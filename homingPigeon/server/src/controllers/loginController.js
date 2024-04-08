const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const validateToken = require("../auth.js")
const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.home = async(req, res, next) => {
  if(!validateToken || validateToken==null) res.redirect("/login");
};

exports.register = async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  await user.save();

  const token = jwt.sign(
    { username: user.username },
    'brenorc',
    { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 } //24hours
  );
  res.header("auth-token", token).json(token);
  return res
        .status(200)
        .send({ _id: user.id, username: user.username, accessToken: token });
};

exports.login = async(req, res) => {
  const user = await User.findOne({ username: req.body.username });
    if (!user || user == null) {
      res.status(404).send({ message: "Sorry... Username not found." });
      return;
    } else {
      const validPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!validPassword || validPassword == null) {
        return res
          .status(401)
          .send({ accessToken: null, message: "Invalid password." });
      } else {
        const token = jwt.sign(
          { user: user.username },
          "brenorc",
          { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 } //24hours
        );
        res.header("auth-token", token).json(token);
        return res
          .status(200)
          .send({ id: user._id, username: user.username, accessToken: token });
      }
      }
  };

exports.logout = async(req, res) =>{
  try {
    req.session = null
    return res.status(200).send({message: "You've been logged out."});
  } catch (error) {
    this.next(error);
  }
};
