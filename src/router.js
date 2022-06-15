const e = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

router.post("/login", (req, res) => {
  // extract user name, password from req.body
  // compare with mockData
  // if valid create and send back token or error message

  const userName = mockUser.username;
  const token = jwt.sign({ userName }, secret);

  res.json({ token });
});

router.get("/profile", (req, res) => {
  const [bearer, token] = req.headers.authorization.split(" ");

  try {
    const payload = jwt.verify(token, secret);
    res.json(mockUser.profile);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
