import { getAddressCoordinates,getDistanceAndTime, getAutoSuggestions } from "../services/maps.service.js";
import { validationResult } from "express-validator";

// Method to get coordinates from address
const getCoordinates = async (req, res, next) => {
  //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ error: "Address is required" });
  }
  try {
    const coordinates = await getAddressCoordinates(address);
    return res.status(200).json(coordinates);
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  
};

// Method to get distance and time
 const getDistanceTime = async (req, res, next) => {
    //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
  try {

    const { origin, destination } = req.query;

    const distanceAndTime = await getDistanceAndTime(origin, destination);
    return res.status(200).json(distanceAndTime);

    
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
 }


 // Method to get suggestions for autocomplete
 const getAutoCompleteSuggestions = async (req, res, next) => {
    //Handle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }
    try {
        const { input } = req.query;

        const suggestions = await getAutoSuggestions(input);
        return res.status(200).json(suggestions);
        
    } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
 }


export { getCoordinates, getDistanceTime,getAutoCompleteSuggestions };
