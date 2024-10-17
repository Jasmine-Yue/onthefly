/*
GET requests at /activities that calls the getActivities function
GET requests at /activities/:trip_id that calls the getTripActivities function
POST requests at /activities/:trip_id that calls the createActivity function
DELETE requests at /activities/:id that calls the deleteActivity function
PATCH requests at '/activities/:id that calls the updateActivityLikes function
    CREATE TABLE IF NOT EXISTS activities (
          id serial PRIMARY KEY,
          trip_id int NOT NULL,
          activity varchar(100) NOT NULL,
          num_votes integer DEFAULT 0,
          FOREIGN KEY(trip_id) REFERENCES trips(id)
      );
*/

import { pool } from "../config/database.js";

//GET requests at /activities that calls the getActivities functions
const getActivities = async (req, res) => {
  const sqlText = "select * from activities order by id ASC ";
  try {
    const results = pool.query(sqlText);
    res.status(200).json(res.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//GET requests at /activities/:trip_id that calls the getTripActivities function
const getTripActivities = async (req, res) => {
  const trip_id = parseInt(req.params.trip_id);
  const sqlText = "select * from activities where trip_id=$1 returning * ";
  try {
    const results = pool.query(sqlText, [trip_id]);
    res.status(200).json(res.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//POST requests at /activities/:trip_id that calls the createActivity function
const createActivity = async (req, res) => {
  const trip_id = parseInt(req.params.trip_id);
  const { activity } = req.body;
  const insertTableText = `
    insert into activities(trip_id,activity)
    values($1,$2)
    returning *
    `;
  const values = [trip_id, activity];
  try {
    const results = await pool.query(insertTableText, values);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//DELETE requests at /activities/:id that calls the deleteActivity function
const deleteActivity = async (req, res) => {
  const id = parseInt(req.params.id);
  const sqlText = `
    delete from activities where id=$1
    returning *
    `;
  try {
    const results = await pool.query(sqlText, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

//PATCH requests at '/activities/:id that calls the updateActivityLikes function
const updateActivityLikes = async (req, res) => {
  const { num_votes } = req.body;

  const id = parseInt(req.params.id);

  const updateTableText = `
    update activities set num_votes=$1  where id=$2
    returning *
    `;
  const values = [parseInt(num_votes), id];
  try {
    const results = await pool.query(updateTableText, values);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getActivities,
  getTripActivities,
  createActivity,
  deleteActivity,
  updateActivityLikes,
};
