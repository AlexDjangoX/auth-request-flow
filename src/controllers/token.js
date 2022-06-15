const jwt = require("jsonwebtoken");

const createToken = (req, res) => {
  const { username, password, profile } = req.body;
  const payload = {};
  payload["username"] = username;
  payload["profile"] = profile;

  const token = jwt.sign(payload, password);
  res.json({ token });
};

const verifyToken = (req, res) => {
  const [token] = req.headers.authorization.split(" ");
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decodedToken);
  } catch (e) {
    res.status(401).json({ error: "No token" });
  }
};

module.exports = { createToken, verifyToken };
