import { Captain } from "../models/Captain.model.js";
import { validationResult } from "express-validator";
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


export { registerCaptain };
