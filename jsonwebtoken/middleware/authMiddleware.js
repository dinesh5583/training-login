const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler")
require("dotenv").config();
const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const payload = jwt.verify(token, process.env.jwtsecret)

      req.user = payload.user;

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({message: 'you are not authenticated'})
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})
module.exports=protect;