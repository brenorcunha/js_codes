const { connect, connection } = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const middlewares = require("./middlewares");
const express = require("express");
const router = require("./routes");
const app = express();
app.use(middlewares.notFound);
app.use(middlewares.errorHandling);
app.use(morgan("common"));
app.use(cors);

try {
  connect("mongodb://127.0.0.1:27017/hp").catch((error) => new Error(error));
  connection.on("open", () => console.log("OpenD"));
  connection.on("connected", () => console.log("KinnectD 2 da DB"));
  connection.on("disconnected", () => console.log("Disconnected"));
  connection.on("reconnected", () => console.log("Reconnected"));
  connection.on("disconnecting", () => console.log("Disconnecting..."));
  connection.on("close", () => console.log("Closed"));
} catch (error) {
  res.send(error)
}

app.use(router);
app.use(express.json());
app.use(cors(corsOptions));

//app.use(express.static(path.join(__dirname,'src')))

/* const newUser = new User({
	username: "brenorc",
	password: "1234"
})

newUser.save()
	.then(() =>{return console.error("User succesfully created")
})
.catch((error) =>{return console.error("Couldn't create the user!")})
*/
const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port.`);
});

module.exports = app;