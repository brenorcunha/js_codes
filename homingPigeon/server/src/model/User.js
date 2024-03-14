const mongoose = require("mongoose")
const {Schema} = require("mongoose")

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
		max: 1024
    },
    tweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
    }]},{
        timestamps: true //Add 'createdAt' and 'updatedAt' fields.
    }
)
module.exports = mongoose.model("User", User)