import express from "express";
const router = express.Router();
import { body,query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { authCaptain } from "../middlewares/auth.middleware.js";
import { ConfirmRide, CreateRide, GetFare, StartRide, EndRide } from "../controllers/ride.controller.js";

//Route to  create a ride
router.post('/create-ride',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    CreateRide
)

//Route to get the Fare
router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup Location'),
    query('destination').isString().isLength({min: 3}).withMessage('Invalid destination Location'),
    GetFare
)

//Route to confirm the ride 
router.post('/confirm',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    ConfirmRide
)

//Route to start the ride 
router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    StartRide
)

//Route to end the ride
router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    EndRide
   
);


export default router;