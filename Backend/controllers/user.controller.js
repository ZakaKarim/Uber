import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { sendWelcomeEmail } from "../services/welcome.email.js";
import { BlackListToken } from "../models/blacklistToken.model.js";
//Method to Register a User
const registerUser = async (req, res, next) => {
  //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { fullname, email, password } = req.body;
    // Checking if all fields are given
    if (!fullname.firstname || !email || !password) {
      return res.status(403).json({ Message: "All fields required" });
    }
    // Check if user already exists
    const isUserAlready = await User.findOne({ email });
    if (isUserAlready) {
      return res.status(409).json({ errors: [{ msg: "User already exists" }] });
    }

    // Create a new user
    const user = new User({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password,
    });
    await user.save();

    const token = user.generateAuthToken();

    // Send welcome email (don't await to avoid delaying response)
    sendWelcomeEmail(email, fullname.firstname);

    res
      .status(201)
      .json({ Message: "User is register  Successfully", user, token });
  } catch (error) {
    console.log("Error while registering user", error);
    return res
      .status(500)
      .json({ Message: "Error while registering user", error });
  }
};

//Method to Login a User
const loginUser = async (req, res) => {
  //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ Message: "Invalid Email or Pssword" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ Message: "Invalid Email or Pssword" });
    }

    //Calling the  jwt token
    const token = user.generateAuthToken();

    //Adding Cookies
    res.cookie("token", token);

    return res
      .status(200)
      .json({ Message: " User Login Successfully", user, token });
  } catch (error) {
    console.log("Error while Login a user", error);
    return res.status(500).json({ Message: "Error while Login user", error });
  }
};

//Method to get a User Profile
const getUserProfile = async (req, res) => {
  try {
    const userID = req.user._id;
    console.log("full Req.user response", req.user);
    const user = await User.findById(userID);
    if (!user) {
      return res.status(401).json({ Message: "User not Found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error while Viewing the User Prolfie", error);
    return res
      .status(500)
      .json({ Message: "Error while Viewing the User Prolfie", error });
  }
};

//Method to Logout a User
const logoutUser = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    await BlackListToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ Message: "User Logout Successfully" });
  } catch (error) {
    console.log("Error while Logout ther User", error);
    return res
      .status(500)
      .json({ Message: "Error while Logout the User", error });
  }
};
export { registerUser, loginUser, getUserProfile, logoutUser };
