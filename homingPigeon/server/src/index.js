const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const middlewares = require("./middlewares.js");
const express = require("express");
const router = require("./routes");
const app = express();
const cookieSession = require("cookie-session");
const path = require("path");

app.use(express.json()); //Parse requests of content type
app.use("/", express.static(path.join(__dirname, "index.html")));
app.use(cors(corsOptions));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use(morgan("common"));
app.use(router);
app.use(middlewares.notFound);
app.use(middlewares.errorHandling);
var corsOptions = {
  origin: "http://localhost:3000",
  origin: (origin, callback) => {
    if ((origin && whiteList.includes(origin)) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./model/User.js");

mongoose.connection.on("connected", () => console.log("KinnectD 2 da DB."));
mongoose.connection.on("open", () => console.log("OpenD"));
mongoose.connection.on("disconnected", () => console.log("Disconnected"));
mongoose.connection.on("reconnected", () => console.log("Reconnected"));
mongoose.connection.on("disconnecting", () => console.log("Disconnecting..."));
mongoose.connection.on("close", () => console.log("Closed"));

mongoose
  .connect("mongodb://127.0.0.1:27017/hp")
  .then(() => {
    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:3333");
    });
  })
  .catch((error) => console.log(error, "Error tring to connect to DB."));

app.use(function (req, res) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
});

cookieSession({
  name: "brenorc-session",
  keys: [process.env.JWT_SECRET],
  httpOnly: true,
});
/* const newUser = new User({
	username: "brenorc",
	password: "1234"
})

newUser.save()
	.then(() =>{return console.error("User succesfully created")
})
.catch((error) =>{return console.error("Couldn't create the user!")})
*/
module.exports = app;
