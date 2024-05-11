//Function that receives the REQ, RES & next function, that calls the next middleware. The own route, in this case.
const jwt = require("jsonwebtoken");
require("dotenv").config({path: './.env'});

validateToken = (req, res, next) => {
  let token = req.session.token;
  
  if(!token || token==null){
    return res.status(403).send({message: "No token found."});
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) =>{
      if(error){
        return res.status(401).send({message: "Unauthorized access!"})
      }
      req.userId = decoded.id;
      next();
    });
  }
}
module.exports = validateToken;
