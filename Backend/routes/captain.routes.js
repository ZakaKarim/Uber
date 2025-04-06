import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { authCaptain } from "../middlewares/auth.middleware.js";
import {
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from "../controllers/captain.controller.js";

//Route to Register a Captain
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
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 1 })
      .withMessage("Plate is at least 1 character long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);

//Route to Login a Captain
router
  .route("/login")
  .post(
    [
      body("email").isEmail().withMessage("Invalid Email"),
      body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 3 characters long"),
    ],
    loginCaptain
  );

//Route to View the Profile of the Captain
router.route("/profile").get(authCaptain, getCaptainProfile);

//Route to Logout a Captain
router.route("/logout").get(authCaptain, logoutCaptain);
export default router;
