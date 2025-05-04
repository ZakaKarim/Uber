import { Captain } from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { BlackListToken } from "../models/blacklistToken.model.js";
import { sendWelcomeEmail } from "../services/welcome.email.js";

//Method to Register a Captain
const registerCaptain = async (req, res) => {
  //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { fullname, email, password, vehicle } = req.body;
    // Checking if all fields are given
    if (
      !fullname.firstname ||
      !email ||
      !password ||
      !vehicle.color ||
      !vehicle.plate ||
      !vehicle.capacity ||
      !vehicle.vehicleType
    ) {
      return res.status(401).json({ Message: "All  Fields are required" });
    }
    // Check if captain already exists
    const captainexist = await Captain.findOne({ email });
    if (captainexist) {
      return res.status().json({ Message: "User already exist" });
    }
    // Create a new captain
    const captain = new Captain({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password,
      vehicle: {
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      },
    });

    await captain.save();

    //Calling the Jwt auth Fucntion to generate a token on registration
    const token = captain.generateAuthToken();

    // Send welcome email (don't await to avoid delaying response)
    // sendWelcomeEmail(email, fullname.firstname);

    res
      .status(201)
      .json({ Message: "Captain is register  Successfully", captain, token });
  } catch (error) {
    console.log("Error while registering Captain", error);
    res.status(500).json({ Message: "Error while registering Captain", error });
  }
};

//Method to Login a User
const loginCaptain = async (req, res) => {
  //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email: email }).select("+password");
    if (!captain) {
      return res.status(401).json({ Message: "Invalid Email or Password" });
    }

    //Matching the password with the old password store in the DB
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ Message: "Invalid Email or Password" });
    }

    //Generating JWT Token
    const token = captain.generateAuthToken();

    //Adding Cookies
    res.cookie("token", token);

    return res.status(200).json({
      Message: "Captain Logged In Successfully",
      captain,
      token,
    });
  } catch (error) {
    console.log("Error while Login a Captain", error);
    res.status(500).json({ Message: "Error while Login a Captain", error });
  }
};

// Method to  View the profile of Captain
const getCaptainProfile = async (req, res) => {
  try {
    const captainID = req.captain._id;
    //console.log("full Req.captain response", req.captain);
    const captain = await Captain.findById(captainID);
    if (!captain) {
      return res.status(401).json({ Message: "Captain not Found" });
    }

    return res.status(200).json({ success: true, captain });
  } catch (error) {
    console.log("Error while Getting the Profile of Captain", error);
    res
      .status(500)
      .json({ Message: "Error while Getting the Profile of Captain", error });
  }
};

//Method to Logout a Captain
const logoutCaptain = async (req, res) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];
    await BlackListToken.create({ token });
    res.clearCookie("token");
    return res.status(200).json({ Message: "User Logout Successfully" });
  } catch (error) {
    console.log("Error while Logout a Captain", error);
    res.status(500).json({ Message: "Error while Logout a Captain", error });
  }
};
export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };
