/*CREATE TABLE IF NOT EXISTS trips_destinations (
          trip_id int NOT NULL,
          destination_id int NOT NULL,
          PRIMARY KEY (trip_id, destination_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
      ); */

// GET requests at / that calls the getTripsDestinations function
import { pool } from "../config/database.js";
const getTripsDestinations = async (req, res) => {
  const sqlText =
    "select * from trips_destinations order by id trip_id asc, destination_id asc";
  try {
    const results = await pool.query(sqlText);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// GET requests at /trips/:destination_id that calls the getAllTrips function
const getAllTrips = async (req, res) => {
  const destination_id = parseInt(req.params.destination_id);

  const sqlText = "select * from trips_destinations where destination_id=$1";
  try {
    const results = await pool.query(sqlText, [destination_id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// GET requests at /destinations/:trip_id that calls the getAllDestinations function
const getAllDestinations = async (req, res) => {
  const trip_id = parseInt(req.params.trip_id);
  const sqlText = ` SELECT d.*
    FROM trips_destinations td
    JOIN destinations d ON td.destination_id = d.id
    WHERE td.trip_id = $1`;
  try {
    const results = await pool.query(sqlText, [trip_id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// POST requests at / that calls the createTripDestination function
const createTripDestination = async (req, res) => {
  const { trip_id, destination_id } = req.body;
  const sqlText =
    "insert into trips_destinations(trip_id,destination_id) values($1,$2) returning *";
  const values = [parseInt(trip_id), parseInt(destination_id)];

  try {
    const results = await pool.query(sqlText, values);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export default {
  getTripsDestinations,
  getAllTrips,
  getAllDestinations,
  createTripDestination,
};
