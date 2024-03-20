const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const path = require("path")
const {fileURLToPath} = require("url")
const app = express()
const router = require("./routes")	
app.use(morgan("common"))
app.use(cors())

try {
	mongoose.connect('mongodb://127.0.0.1:27017/hp').catch(error => handleError(error));
	mongoose.connection.on('open', () => console.log('OpenD'))
	mongoose.connection.on('connected', () => console.log('KinnectD 2 da DB'))
	mongoose.connection.on('disconnected', () => console.log('Disconnected'))
	mongoose.connection.on('reconnected', () => console.log('Reconnected'))
	mongoose.connection.on('disconnecting', () => console.log('Disconnecting...'))
	mongoose.connection.on('close', () => console.log('Closed'))
} catch (error) {
	console.error(error)
}

app.use(router)
//Body parsing middleware: Tell express we want to use the requests as JSON data.
app.use(express.json())
app.use(express.static(path.join(__dirname,'src')))


app.get('/', async (req, res) => {
  	res.sendFile(path.join(__dirname,'/index.html'))
})
/* const newUser = new User({
	username: "brenorc",
	password: "1234"
})

newUser.save()
	.then(() =>{return console.error("User succesfully created")
})
.catch((error) =>{return console.error("Couldn't create the user!")})
*/
const PORT = 3333

app.listen(PORT, ()=> {
	console.log(`Server listening on ${PORT} port.`)
})

//NOT FOUND MIDDLEWARE: Se a URL não for encontrada, exibe a msg, corrige status da req e passa adiante.
const notFound =(req, res, next)=> {
const error = new Error (`Not found ${req.originalUrl}`)
	res.status(404)
	next(error)
}
//ERROR HANDLING MIDDLEWARE: Se a req chegar com status 200 (success) significa que não foi tratada, então coloca status de erro e retorna tudo.
const errorHandling = (error,req,res,next)=>{
	const statusCode = res.statusCode===200 ? 500 : res.statusCode
	res.statusCode = statusCode
	res.json({
		message: error.message,
		trace: process.env.NODE_ENV==="production" ? "Not allowed infos, sorry...":error.trace
	})
}
module.exports = {app, errorHandling, notFound}