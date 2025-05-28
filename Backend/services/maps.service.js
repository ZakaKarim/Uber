import axios from "axios";

// 1. Get Coordinates from Address
const getAddressCoordinates = async (address) => {
  const apiKey = process.env.MAPS_API;
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
    address
  )}`;
  try {
    const response = await axios.get(url);
    if (
      response.data &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      const coords = response.data.features[0].geometry.coordinates;
      return {
        lng: coords[0], // Longitude
        ltd: coords[1], // Latitude
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 2. Get Distance and Time between two addresses
const getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required" });
  }
  const apiKey = process.env.MAPS_API;
  try {
    // Step 1: Get coordinates
    const originCoords = await getAddressCoordinates(origin); // { lng, ltd }
    const destinationCoords = await getAddressCoordinates(destination); // { lng, ltd }

    // Step 2: Call OpenRouteService directions API
    const body = {
      coordinates: [
        [originCoords.lng, originCoords.ltd],
        [destinationCoords.lng, destinationCoords.ltd],
      ],
    };
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      body,
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );
    if (
      response.data &&
      response.data.routes &&
      response.data.routes.length > 0
    ) {
      const route = response.data.routes[0];
      // Convert distance to km, duration to minutes
      const distanceInKm = route.summary.distance / 1000;
      const durationInMin = route.summary.duration / 60;

      // Fare calculation
      const baseFare = 100;
      const costPerKm = 40;
      const costPerMin = 2;

      const fare =
        baseFare + costPerKm * distanceInKm + costPerMin * durationInMin;
      // Convert duration to hours and minutes
      const hours = Math.floor(durationInMin / 60);
      const minutes = Math.round(durationInMin % 60);
      return {
        "Total Distance": `${distanceInKm.toFixed(2)} km`,
        "Estimated Duration": `${hours}h ${minutes}min`,
        "Estimated Fare (PKR)": `₨ ${Math.ceil(fare)}`,
      };
      //   return {
      //     distance: distanceInKm.toFixed(2), // in kilometers
      //     duration: durationInMin.toFixed(2), // in minutes
      //     Fare: Math.ceil(fare), // rounded to nearest PKR
      //   };
      //   return {
      //     distance: route.summary.distance, // meters
      //     duration: route.summary.duration, // seconds
      //     //duration: (route.summary.duration / 60).toFixed(2), // minutes
      //   };
    } else {
      throw new Error("No route found");
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error);
    throw error;
  }
};

const getAutoSuggestions = async (input) => {
  if (!input) {
    throw new Error("Query is required for suggestions");
  }

  const apiKey = process.env.MAPS_API;
  const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${encodeURIComponent(
    input
  )}`;
  try {
    const response = await axios.get(url);

    if (
      response.data &&
      response.data.features &&
      response.data.features.length > 0
    ) {
      return response.data.features
        .map((feature) => feature.properties.label)
        .filter(Boolean); // removes any null/undefined values
    } else {
      throw new Error("No suggestions found");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getAddressCoordinates, getDistanceAndTime, getAutoSuggestions };
