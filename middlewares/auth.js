const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const tokenHeader =
    req.body.token || req.query.token || req.headers["authorization"];
  if (typeof tokenHeader !== "undefined") {
    const bearer = tokenHeader.split(" ");
    const token = bearer[1];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyToken;
