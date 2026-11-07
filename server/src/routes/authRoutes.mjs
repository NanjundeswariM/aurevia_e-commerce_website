import express from "express";
import jwt from "jsonwebtoken";
import passport from "../config/passport.mjs";

import { registerUser, loginUser, getTotalCustomers} from "../controllers/authController.mjs";
import protect, { adminOnly } from "../middleware/authMiddleware.mjs";
const router = express.Router();

const CLIENT_URL = (
  process.env.CLIENT_URL || "http://localhost:5173"
).replace(/\/$/, "");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${CLIENT_URL}/login?googleError=1`
  }),
  (req, res) => {
    try {
      const user = req.user;
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      const params = new URLSearchParams({
        token,
        user: JSON.stringify(userData)
      });
      res.redirect(
        `${CLIENT_URL}/google-success#${params.toString()}`
      );
    } catch (error) {
      console.error("Google login callback error:", error);
      res.redirect(`${CLIENT_URL}/login?googleError=1`);
    }
  }
);

router.get(
  "/customers/count",
  protect,
  adminOnly,
  getTotalCustomers
);

export default router;