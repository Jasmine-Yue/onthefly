import express from "express";

import DestinationsController from "../controller/destinations.js";

const router = express.Router();

router.get("/", DestinationsController.getDestinations);

// GET requests at /destinations/:id that calls the getDestination function
router.get("/:id ", DestinationsController.getDestination);

// POSTS requests at /destinations that calls the createDestination function destinations
router.post("/", DestinationsController.createDestination);

//DELETE requests at /activities/:id that calls the deleteActivity function
router.delete("/:id", DestinationsController.deleteDestination);

// PATCH requests at /destinations/:id that calls the updateDestination function
router.patch("/:id", DestinationsController.updateDestination);

export default router;
