import express from "express";
import cors from "cors";
import TripRouter from "./routes/trips.js";
import ActivitiesRouter from "./routes/activities.js";
import DestinationsRouter from "./routes/destinations.js";
import TripDestinationRouter from "./routes/trip_destinations.js";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/trips", TripRouter);
app.use("/api/activities", ActivitiesRouter);
app.use("/api/destinations", DestinationsRouter);

app.use("/api/trips-destinations", TripDestinationRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">✈️ On the Fly API</h1>'
    );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
