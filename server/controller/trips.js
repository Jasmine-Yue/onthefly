import { pool } from "../config/database.js";

/*
createTrip() to add a new trip to the trips table.
getTrips() to read all trips from the trips table.
getTrip() to read a trip from the trips table.
updateTrip() to update the details for a trip in the trips table.
deleteTrip() to delete a trip from the trips table.
*/
const createTrip = async (req, res) => {
  const {
    title,
    description,
    img_url,
    num_days,
    start_date,
    end_date,
    total_cost,
  } = req.body;

  const insertTableText = `
    insert into trips(title, description,img_url,num_days,start_date,end_date,total_cost)
    values($1,$2,$3,$4,$5,$6,$7)
    returning *
    `;
  const values = [
    title,
    description,
    img_url,
    num_days,
    start_date,
    end_date,
    total_cost,
  ];
  try {
    const results = await pool.query(insertTableText, values);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
const getTrips = async (req, res) => {
  const sqlText = `
    select * from trips ORDER BY id ASC
    `;
  try {
    const results = await pool.query(sqlText);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getTrip = async (req, res) => {
  const { id } = req.params; //const id = parseInt(req.params.id)
  const sqlText = `
    select * from trips where id=$1
    `;
  try {
    const results = await pool.query(sqlText, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const updateTrip = async (req, res) => {
  const {
    title,
    description,
    img_url,
    num_days,
    start_date,
    end_date,
    total_cost,
  } = req.body;

  console.log("in update:", req.params);

  const id = parseInt(req.params.id);

  const updateTableText = `
    update trips set title=$1, description=$2,img_url=$3,num_days=$4,start_date=$5,end_date=$6,total_cost=$7
    where id=$8
    returning *
    `;
  const values = [
    title,
    description,
    img_url,
    num_days,
    start_date,
    end_date,
    total_cost,
    id,
  ];
  try {
    const results = await pool.query(updateTableText, values);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const deleteTrip = async (req, res) => {
  const id = parseInt(req.params.id);
  const sqlText = `
    delete from trips where id=$1
    returning *
    `;
  try {
    const results = await pool.query(sqlText, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  createTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
};
