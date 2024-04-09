const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.user = require("../model/User");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Tweet = require("../model/Tweet.js");

//exports.