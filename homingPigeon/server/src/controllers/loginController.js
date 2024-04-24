const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
validateToken = require("../auth.js");
const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: './src/.env'});
const path = require("path");
exports.blank = async (req, res) =>{
  if(req.token){
    res.redirect("/home")
    //res.sendFile(path.join(__dirname, '../index.html'));
  } else{
    res.redirect("/login")
  }
};
exports.home = async (req, res) => {
  res.redirect("/home")
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
      process.env.JWT_SECRET,
      { algorithm: "HS256", allowInsecureKeySizes: true, expiresIn: 86400 } //24hours
    );
    req.session.token = token;
    res.status(200).send({
      id: user._id,
      username: user.username
    })
    /* return res
    .status(200)
    .header("auth-token", token)
    .send({ id: user.id, username: user.username, accessToken: token }); */
  }
};

exports.login = async (req, res) => {
  try {
    //const { username, password } = req.session.token;
    var username = req.body.username
    const password = req.body.password
    user = await User.findOne({username}).exec();
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Senha inválida." });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "24h" }
    );
    if (!token || token === null){
      console.error("Error trying to logIn: INVALID OR NULL TOKEN");
      return ;
    }
    else {
    req.session.token = token;
    return res.status(200).send({
      id: user._id,
      username: user.username,
      token: token
    });
    }
  } catch (error) {
    console.error("Error trying to logIn: ", error);
    return res.status(500).send({ message: error.message});
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
