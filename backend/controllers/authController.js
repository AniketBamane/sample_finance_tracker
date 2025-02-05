import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import user from "../models/user.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signup Controller
export const signup = async (req, res) => {
  try {
    console.log("in signup")
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(newUser._id);

    // Send cookie
    res.cookie("financetoken", token);

    res.status(201).json({ message: "User registered successfully", user: { username, email,userId:newUser._id } });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = generateToken(user._id);

    // Send cookie
    res.cookie("financetoken", token);

    res.json({ message: "Login successful", user: { username: user.username, email: user.email,userId:user._id } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Logout Controller
export const logout = (req, res) => {
  res.cookie("financetoken", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};


// Get User Details Controller
export const getUserDetails = async (req, res) => {
  try {
    // Use the user data from the decoded JWT token (which was added by the protect middleware)
    console.log("in get user details !")
    const userId = req.user.userId;
    
    // Find the user by the ID from the database
    const user = await User.findById(userId).select("-password"); // Exclude password from the response
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user details
    res.status(200).json({ user: { username: user.username, email: user.email,userId } });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user details", error });
  }
};
