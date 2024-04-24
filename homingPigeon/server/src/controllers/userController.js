const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const User = db.user;
const jwt = require("jsonwebtoken");
require("dotenv").config({path: './src/.env'});

exports.getallUsers = async (req, res) => {
  try {
    const users = await User.find({});
    
    if(!users || users==null){
      res.status(500).json({error: "Empty users list."})
      return ;
    } else{
      return res.status(200).json(users);
    }
  } catch (error) {
    res.status(400).json({ error: "Unable to get users." });
  }
};

exports.getaUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(400).send({ message: "Sorry... Username not found." });
    } else {
      return res.status(200).send(user);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).send({ message: "Internal server error." });
  }
};


exports.deleteaUser = async (req, res) => {
    const userId = req.body.id;
    const user = await User.findOne({
      _id: userId
    }).exec();
  
    if (!user || user == null) {
      return res.status(400).send({ message: "Sorry... Username not found." });
    } else{
      try{
        await User.deleteOne({_id: userId});
        res.status(200).send({ message: "User deleted successfully." });
      } catch (error) {
        res.status(500).send({ message: error.message });
        return;
      }
    }
};
