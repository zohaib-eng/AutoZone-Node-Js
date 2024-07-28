const {User:User}=require('../database/schemas/user.schema');
const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decodedUser = jwt.verify(token, config.JWT_KEY);
    let getUser = await User.findOne({email:decodedUser.email});
    if(getUser == null)
      return res.status(401).send({"message": "User is not exist"});
    // if(getSup==null)
    // return res.status(401).send({"message": "Supplier is not exist"});

  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;