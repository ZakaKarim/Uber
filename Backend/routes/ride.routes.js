import express from "express";
const router = express.Router();
import { body,query } from "express-validator";
import { authUser } from "../middlewares/auth.middleware.js";
import { CreateRide, GetFare } from "../controllers/ride.controller.js";

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

export default router;