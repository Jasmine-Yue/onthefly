import express from "express";
import cors from "cors";
import TripRouter from "./routes/trips.js";
import ActivitiesRouter from "./routes/activities.js";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/trips", TripRouter);
app.use("/api/activities", ActivitiesRouter);

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
