import express from "express";
const router = express.Router();
import { body } from "express-validator";
<<<<<<< HEAD
import { loginUser, registerUser } from "../controllers/user.controller.js";

//Router to Register a User
=======
import { getUserProfile, loginUser, registerUser, logoutUser } from "../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

//Route to register a User
>>>>>>> ca868c9ef37daf8c1489a78e17dd0ce76f7f8813
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

<<<<<<< HEAD
//Router to Login a User
router
  .route("/login")
  .post(
    [
      body("email").isEmail().withMessage("Invalid Email"),
      body("password")
        .isLength({ min: 3 })
        .withMessage("Password must be at least 3 characters long"),
    ],
    loginUser
  );
=======
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
>>>>>>> ca868c9ef37daf8c1489a78e17dd0ce76f7f8813

export default router;
