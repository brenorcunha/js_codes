const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
validateToken = require("../auth.js");
const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: './.env'});
const path = require("path");

exports.blank = async (req, res) => {
  if(req.session.token){
    res.redirect("/home")
    //res.sendFile(path.join(__dirname, '../index.html'));
  } else{
    res.redirect("/login")
  }
};
exports.home = async (req, res) =>{
  return res
    .status(200)
    .send({ message: "Access OK"}); 
}
exports.register = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
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
  }
};

exports.login = async (req, res) => {
  try {
    //const { username, password } = req.session.token;
    let username = req.body.username
    const password = req.body.password
    let user = await User.findOne({username: username}).exec();
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
