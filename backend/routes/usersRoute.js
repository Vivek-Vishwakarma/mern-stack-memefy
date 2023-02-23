const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/config");
const User = require("../models/UserModel");
// Register
router.post("/register", async (req, res) => {
  try {
    const { email, image, name } = req.body;
    const userPass = req.body.password;
    // validate
    if (!email || !userPass || !name)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (userPass.length < 3)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 3 characters long." });
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(userPass, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      image,
      name,
    });
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;
    res.json({
      token,
      user: others,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const userPassword = req.body.password;
    if (!email || !userPassword)
      return res.status(400).json({ msg: "Not all fields have been entered." });
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    const isMatch = await bcrypt.compare(userPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;
    res.json({
      token,
      user: others,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
