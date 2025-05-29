import { createRide } from "../services/ride.service";
import { validationResult } from "express-validator";

const CreateRide = async (req, res) => {
    //Handle Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }
    try {

        const { userId, pickup, destination, vehicleType } = req.body
        const ride = await createRide({ user: userId, pickup: pickup, destination: destination, vehicleType: vehicleType })
        return res.status(200).json({ride})

    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
export { CreateRide }