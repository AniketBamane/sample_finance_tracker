import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signup = async (req, res) => {
  try {
    console.log("in signup")
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = generateToken(newUser._id);

    res.cookie("financetoken", token,{
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
    });

    res.status(201).json({ message: "User registered successfully", user: { username, email,userId:newUser._id } });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.cookie("financetoken", token,
      {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
        secure: process.env.NODE_ENV === "production"? true : false, 
      }
    );

    res.json({ message: "Login successful", user: { username: user.username, email: user.email,userId:user._id } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

export const logout = (req, res) => {
  res.cookie("financetoken", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};


export const getUserDetails = async (req, res) => {
  try {
    console.log("in get user details !")
    const userId = req.user.userId;
    
    const user = await User.findById(userId).select("-password"); 
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: { username: user.username, email: user.email,userId } });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user details", error });
  }
};
