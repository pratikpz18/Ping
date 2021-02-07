const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    if(req.session.userid){
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
    }else{
      res.status(500).send({ message: "Invalid Token" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};