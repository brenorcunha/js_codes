//Function that receives the REQ, RES & next function, that calls the next middleware. The own route, in this case.
function validateToken(req, res, next) {
  const jwtDecode = require("jwt-decode");
  try {
    const decodedToken = jwtDecode.verify(token, process.env.JWT_SECRET);
    console.log("Token is valid:", decodedToken);
  } catch (error) {
    console.error("Invalid token:", error.message);
  }
}

module.exports = validateToken;