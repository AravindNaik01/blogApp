const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
// require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        status: "fail",
        messagee: "please provide a username and password",
      });
    }
    const user = await User.findOne({ username }).select(+password);
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ status: "fail", messagee: "Invalid credential" });
    }
    const payload = { id: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({ status: "success", token });
  } catch (error) {
    // 9. Handle any unexpected server errors
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      status: "error",
      message: "An internal server error occurred.",
    });
  }
};
