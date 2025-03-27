import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { getUserProfile, loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

//Route to register a User
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
  ],
  registerUser
);

//Route to Login a User
router.route("/login").post([
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
  .isLength({ min: 3 })
  .withMessage("Password must be at least 3 characters long"),
],loginUser)

//Route to View the Profile of the user 
router.route("/profile").get(authUser,getUserProfile)

//Route to Logout a User
router.route("/logout").get(authUser,logoutUser)

export default router;
