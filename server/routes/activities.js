import express from "express";
import ActivitiesController from "../controller/activities.js";

const router = express.Router();

router.get("/", ActivitiesController.getActivities);

//GET requests at /activities/:trip_id that calls the getTripActivities function
router.get("/:trip_id ", ActivitiesController.getTripActivities);

//POST requests at /activities/:trip_id that calls the createActivity function
router.post("/:trip_id", ActivitiesController.createActivity);

//DELETE requests at /activities/:id that calls the deleteActivity function
router.delete("/:id", ActivitiesController.deleteActivity);
//PATCH requests at '/activities/:id that calls the updateActivityLikes function
router.patch("/:id", ActivitiesController.updateActivityLikes);

export default router;
