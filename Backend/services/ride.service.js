import { Ride } from "../models/ride.model.js";
import { getDistanceAndTime } from "./maps.service.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination is required");
  }

  const distanceTime = await getDistanceAndTime(pickup, destination);
  const baseFare = {
    auto: 50,
    car: 100,
    moto: 30,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  console.log("distanceTime", distanceTime);
  // console.log("distanceduration",distanceduration)

  const distanceInKm = distanceTime.distance / 1000;
  const durationInMin = distanceTime.duration / 60;

  //   const fare = {
  //     auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
  //     car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
  //     moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
  // };

  // console.log("distanceInKm",distanceInKm)
  // console.log("durationInMin",durationInMin)

  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceInKm * perKmRate.auto +
        durationInMin * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        distanceInKm * perKmRate.car +
        durationInMin * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        distanceInKm * perKmRate.moto +
        durationInMin * perMinuteRate.moto
    ),
  };

  return fare;
}

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}

const createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All feilds are required....");
  }

  const fare = await getFare(pickup, destination);

  console.log(fare);

  const ride = Ride.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });
  return ride;
};

const confirmRide = async ({ rideId,captain }) => {
  if (!rideId) {
    return res.status(400).json({ message: "Ride ID is required" });
  }

   await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id 
    })

  const ride = await Ride.findOne({ _id: rideId }).populate("user").populate('captain').select('+otp');
  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

export { createRide, getFare, confirmRide };
