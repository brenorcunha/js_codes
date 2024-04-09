//Function that receives the REQ, RES & next function, that calls the next middleware. The own route, in this case.
const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

validateToken = (req, res) => {
  //const token = req.header["authentication"];
  try {
    const token = req.session.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    return token;
  } catch (error) {
    return res.status(401).send({ message: "[TOKEN ERROR] Access not allowed." });
  }
};

module.exports = validateToken;
