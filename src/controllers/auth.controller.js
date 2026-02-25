const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


// 🔹 Signup
async function registerUser  (req, res)  {
  try {
    const { name, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });
// res.cookie("token",token); 

    res.status(201).json({
        message:"User Created Succeffully",
        user:{
            _id:user._id,
            name:user.name,
            email:user.email,
             subscriptionType: user.subscriptionType,

        },
        token :generateToken(user._id),

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Login
async function loginUser (req, res)  {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
  res.cookie("token", token, {
        httpOnly: true,
        secure: false, // production me true
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({
        _id: user._id, 
        name: user.name,
        email: user.email,
        subscriptionType: user.subscriptionType,
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {registerUser,loginUser}
