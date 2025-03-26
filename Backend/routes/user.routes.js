import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { loginUser, registerUser } from "../controllers/user.controller.js";

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

export default router;
