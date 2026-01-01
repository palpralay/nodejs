const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// |--------------------------------------------------|
// |              Home controller                     |
// |--------------------------------------------------|
const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to the home page");
  } catch (error) {
    console.error("Error in home controller:", error);
    res.status(500).send("An error occurred");
  }
};

// |--------------------------------------------------|
// |              Registration controller             |
// |--------------------------------------------------|

//step 1: retrieve user data from req.body
//step 2: validate user data (e.g., check if username/email already exists)
//step 3: hash the password
//step 4: create a new user in the database
//step 5: send a response back to the client

const register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: createdUser._id, email: createdUser.email, isAdmin: createdUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 18000000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // console.log("User registered:", createdUser, "Token:", token);

    res.status(201).send({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

// |--------------------------------------------------|
// |               Login controller                   |
// |--------------------------------------------------|
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 18000000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // console.log("User logged in:", user, "Token:", token);

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

// |--------------------------------------------------|
// |      User logic- to send user data               |
// |--------------------------------------------------|


const user = async (req, res) => {
  try {
    const userData = await User
      .findById(req.user.id)
      .select("username email");

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { user };


module.exports = {
  home,
  register,
  login,
  user,
};
