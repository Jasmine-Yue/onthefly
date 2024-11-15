import express from "express";
import cors from "cors";
import TripRouter from "./routes/trips.js";
import ActivitiesRouter from "./routes/activities.js";
import DestinationsRouter from "./routes/destinations.js";
import TripDestinationRouter from "./routes/trip_destinations.js";
import authRouter from "./routes/auth.js";
import userTripRoutes from "./routes/users-trips.js";

import passport from "passport";
import session from "express-session";
import { GitHub } from "./config/auth.js";

const app = express();

app.use(express.json());

//app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use(
  session({
    secret: "codepath",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(GitHub);

/*When a user logs in, serializeUser will determine what data from the user object 
should be stored in the session. Then with each subsequent request,
 deserializeUser will use the data stored in the session to create a user object
  and assign it to req.user. */
//serializeUser，save user id in  session
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserializeUser，retrieve user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use("/auth", authRouter);

app.use("/api/trips", TripRouter);
app.use("/api/activities", ActivitiesRouter);
app.use("/api/destinations", DestinationsRouter);

app.use("/api/trips-destinations", TripDestinationRouter);

app.use("/users-trips", userTripRoutes);

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
