import express from "express";
import TripsController from "../controller/trips.js";

const router = express.Router();

router.post("/", TripsController.createTrip);

router.get("/", TripsController.getTrips);

router.get("/:id", TripsController.getTrip);

router.patch("/:id", TripsController.updateTrip);

router.delete("/:id", TripsController.deleteTrip);

export default router;
