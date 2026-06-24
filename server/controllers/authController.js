const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { name, email, password, skills } = req.body;

    const user = new User({
      name,
      email,
      password,
      skills
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};