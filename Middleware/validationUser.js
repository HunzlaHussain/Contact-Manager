const errorHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validationUser = errorHandler(async (req, res, next) => {
  let token;
  let headertoken = req.headers.Authorization || req.headers.authorization;
  if (headertoken && headertoken.startsWith("Bearer")) {
    token = headertoken.split(" ")[1];
    jwt.verify(token, process.env.private_token, (err, decode) => {
      if (err) {
        res.status(404);
        throw new Error("User is not Authorzation");
      }
      req.user = decode.user;
      console.log(decode.user);
      next();
    });
  }
});
module.exports = validationUser;
