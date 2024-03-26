const Tweet = require("./Tweet");
const User = require("./User")
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const TweetLike = new mongoose.Schema({
  tweetId: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("TweetLike", TweetLike);
