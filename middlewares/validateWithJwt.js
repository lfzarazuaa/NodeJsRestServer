const User = require("../models/user"); // Import User Schema
const jwt = require("jsonwebtoken");
const { response, request } = require("express");
// Authorize that the Jwt is valid
const validateJwt = async (req = response, res = request, next) => {
  // Read validator from express validators.

  let tokenstr = req.header("Authorization");
  if (!tokenstr) {
    return res.status(401).json({ error: "Unauthorized, no token"});
  }

  const [bearer, token] = tokenstr.split(" ");
  if (bearer !== "Bearer") {
    return res.status(401).json({ error: "Bad Format for Bearer JWT token."});
  }
  let payload;
  try {
    // Validate token
    payload = jwt.verify(token,process.env.SECRET_OR_PRIVATE_KEY);
  } catch (error) {
    // Posible errors on token.
    if(error.name === "TokenExpiredError")
      return res.status(401).json({ error: `Token no longer valid expired at ${error.expiredAt}`});
    if(error.name === "SyntaxError")
      return res.status(401).json({ error: "Unexpected token, invalid sintaxis"});
    if(error.name === "JsonWebTokenError")
      return res.status(401).json({ error: "Invalid Signature on token"});
    return res.status(401).json({ error: "Invalid Token"});
  }
  req.userAuthenticated = await User.findById(payload.uid);
  if(!req.userAuthenticated){
    return res.status(401).json({ error: "User not found during authentication."});
  }
  if(!req.userAuthenticated.state){
    return res.status(401).json({ error: "The user is no longer available."});
  }
  // Call the next function.
  next();
};

module.exports = { validateJwt };
