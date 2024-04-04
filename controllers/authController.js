const jwt = require("jsonwebtoken");

const authController = {
  login: async (req, res) => {
    const userId = 1;
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  },
};

module.exports = authController;
