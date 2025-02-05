import express from "express";
import { signup, login, logout, getUserDetails } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/user-details", protect, getUserDetails); // New route to get user details

export default router;
