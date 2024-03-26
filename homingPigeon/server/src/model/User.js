const { Schema , model } = require("mongoose");

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
    },
    tweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
  },
  {
    timestamps: true, //Add 'createdAt' and 'updatedAt' fields.
  }
);
module.exports = mongoose.model("User", User);
