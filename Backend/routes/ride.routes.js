import express from "express";
const router = express.Router();
const { body } = require("express-validator");
import { authUser } from "../middlewares/auth.middleware.js";
import { CreateRide } from "../controllers/ride.controller.js";

//Route to 
router.post('/create-ride',
    body('userId').isString().isLength({min: 24,max: 24}).withMessage('User ID is required ..Invalid Id'),
    body('pickup').isString().isLength({min: 3}).withMessage('Pickup location is required'),
    body('destination').isString().isLength({min: 3}).withMessage('Destination location is required'),
    body('vehicleType').isString().isIn[('auto','car','motorcycle')].withMessage('Invalid Vehicle type'),
    CreateRide
)

export default router;