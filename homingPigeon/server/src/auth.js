const jwtDecode = require("jwt-decode") //IMPORTED AS A MODULE
//Function that receives the REQ, RES & next function, that calls the next middleware. The own route, in this case.
async function validateToken(req,res, next) {
    const token = req.reader('auth-token') //There's a token in this session?
    if(!token) { throw new AppError('JWT token is missing.') }
    try {
        const verified = jwtDecode.verify(token,
            process.env.JWT_SECRET) //Check if token is valid
        req.user = verified

        return next() //Call next middleware.
    } catch {
        throw new Error('Invalid token.')
    }
}
module.exports = validateToken