//Function that receives the REQ, RES & next function, that calls the next middleware. The own route, in this case.
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: './src/.env'});

validateToken = async(req, res, next) => {
  const token = req.session.token;
  try {
    if(!token){
      return res.status(403).send({message: "No token found."});
    } else {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

module.exports = validateToken;
