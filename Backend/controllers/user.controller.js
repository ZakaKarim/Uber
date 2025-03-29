import { User } from "../models/user.model.js";
import { validationResult } from "express-validator";

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

    res
      .status(201)
      .json({ Message: "User is register Successfulyy", user, token });
  } catch (error) {
    console.log("Error while registering user", error);
    return res
      .status(500)
      .json({ Message: "Error while registering user", error });
  }
};

//Method to Login a User
const loginUser = async (req, res, next) => {
  //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    // Checking if all fields are given
    if (!email || !password) {
      return res.status(403).json({ Message: "All fields required" });
    }
    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ Message: "Invalid email or password" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ Message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ Message: "User Login Successfully", user, token });
  } catch (error) {
    console.log("Error while Login user", error);
    return res.status(500).json({ Message: "Error while Login user", error });
  }
};
export { registerUser, loginUser };
