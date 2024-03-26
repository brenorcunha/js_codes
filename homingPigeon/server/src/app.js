const { json } = require("express");
const { connect, connection } = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes.js");
const path = require("path")

const express = require("express");
const app = express();

app.use(morgan("common"));
app.use(
	cors({
    origin: "http://localhost:3000"
  })
);

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

//Body parsing middleware: Tell express we want to use the requests as JSON data.
app.use(json());
//app.use(express.static(path.join(__dirname,'src')))

app.get("/", async (req, res, next) => {
  res.redirect("/home")
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
const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port.`);
});

//NOT FOUND MIDDLEWARE: Se a URL não for encontrada, exibe a msg, corrige status da req e passa adiante.
const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(error);
};
//ERROR HANDLING MIDDLEWARE: Se a req chegar com status 200 (success) significa que não foi tratada, então coloca status de erro e retorna tudo.
const errorHandling = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.statusCode = statusCode;
  res.json({
    message: error.message,
    trace:
      process.env.NODE_ENV === "production"
        ? "Not allowed infos, sorry..."
        : error.trace,
  });
};
module.exports = { app, errorHandling, notFound };