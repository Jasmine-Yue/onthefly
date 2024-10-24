import express from "express";
import TripDestinationsController from "../controller/trip_destinations.js";

const router = express.Router();
// GET requests at / that calls the getTripsDestinations function
router.get("/", TripDestinationsController.getTripsDestinations);
// GET requests at /trips/:destination_id that calls the getAllTrips function
router.get("/trips/:destination_id", TripDestinationsController.getAllTrips);
// GET requests at /destinations/:trip_id that calls the getAllDestinations function

router.get(
  "/destinations/:trip_id",
  TripDestinationsController.getAllDestinations
);
// POST requests at / that calls the createTripDestination function

router.post("/", TripDestinationsController.createTripDestination);

export default router;
