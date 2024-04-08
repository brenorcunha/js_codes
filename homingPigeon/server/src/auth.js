//Function that receives the REQ, RES & next function, that calls the next middleware. The own route, in this case.
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

validateToken = (req, res, next) => {
  //const token = req.header["authentication"];
  try {
    const token = req.session.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    res.status(200).send({message: "Everything's OK with the token."});
    next();
    return token;
  } catch (error) {
    res.status(401).send({ message: "Access not allowed." });
    next();
      return ;
  }
};

module.exports = validateToken;
