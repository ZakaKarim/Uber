import { createRide, getFare } from "../services/ride.service.js";
import { getCaptainsInTheRadius,getAddressCoordinates } from "../services/maps.service.js"
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js"
import { Ride } from "../models/ride.model.js";

const CreateRide = async (req, res) => {
    //Handle Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {

        const { pickup, destination, vehicleType } = req.body
        const ride = await createRide({ user: req.user._id, pickup: pickup, destination: destination, vehicleType: vehicleType })
        res.status(200).json({ ride })

        const pickupCoordinates = await getAddressCoordinates(pickup);

        console.log("pickupCoordinates", pickupCoordinates)

        const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 5);

         ride.otp = ""
         
        const rideWithUser  = await Ride.findOne({_id: ride._id}).populate("user");
        captainsInRadius.map(captain =>{
            console.log("captain", captain)
            console.log("ride", ride)
            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            })
        })
        console.log("captainsInRadius", captainsInRadius)

    

    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        //return res.status(500).json({ error: "Internal Server Error",error });
        return res.status(500).json({ message: error.message, error });
    }
}

const GetFare = async (req, res) => {
    //Handle Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {
        const { pickup, destination } = req.query;

        const fare = await getFare(pickup, destination);
        return res.status(200).json(fare)
    } catch (error) {
        console.error("Error while fetiing the fare:", error.message);
        return res.status(500).json({ message: error.message, error });
    }
}

export { CreateRide, GetFare }