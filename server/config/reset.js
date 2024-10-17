import { pool } from "./database.js";
import "./dotenv.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

//Create a new variable called currentPath that is set to the URL to the current file.

const currentPath = fileURLToPath(import.meta.url);

//console.log("currentPath:", currentPath);
//console.log("url:", import.meta.url);

//Create a new variable called tripsFile that is set to the data.json file.

const tripsFile = fs.readFileSync(
  path.join(dirname(currentPath), "../config/data/data.json")
);

//Create a new variable called tripsData that is set to the parsed tripsFile.

const tripsData = JSON.parse(tripsFile);
//const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

const createTripsTable = async () => {
  const createTripsTableQuery = `
      CREATE TABLE IF NOT EXISTS trips (
          id serial PRIMARY KEY,
          title varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          img_url text NOT NULL,
          num_days integer NOT NULL,
          start_date date NOT NULL,
          end_date date NOT NULL,
          total_cost money NOT NULL
      );
  `;
  try {
    const result = await pool.query(createTripsTableQuery);
    console.log("🎉 trips table created successfully");
  } catch (error) {
    console.error("⚠️ error creating trips table", error);
  }
};

const seedTripsTable = async () => {
  await createTripsTable();
  tripsData.forEach((trip) => {
    const insertTableText = `
    insert into trips(title, description,img_url,num_days,start_date,end_date,total_cost)
    values($1,$2,$3,$4,$5,$6,$7)
    `;
    const values = [
      trip.title,
      trip.description,
      trip.img_url,
      trip.num_days,
      trip.start_date,
      trip.end_date,
      trip.total_cost,
    ];
    pool.query(insertTableText, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting trip", err);
        return;
      }
      console.log(`✅ ${trip.title} added successfully`);
    });
  });
};

const createDestinationsTable = async () => {
  const createDestinationsTableQuery = `
      CREATE TABLE IF NOT EXISTS destinations (
          id serial PRIMARY KEY,
          destination varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          city varchar(100) NOT NULL,
          country varchar(100) NOT NULL,
          img_url text NOT NULL,
          flag_img_url text NOT NULL
      );
  `;

  try {
    const result = await pool.query(createDestinationsTableQuery);
    console.log("🎉 destinations table created successfully");
  } catch (error) {
    console.error("⚠️ error creating destinations table", error);
  }
};

const createActivitiesTable = async () => {
  const createActivitiesTableQuery = `
      CREATE TABLE IF NOT EXISTS activities (
          id serial PRIMARY KEY,
          trip_id int NOT NULL,
          activity varchar(100) NOT NULL,
          num_votes integer DEFAULT 0,
          FOREIGN KEY(trip_id) REFERENCES trips(id)
      );
  `;
  try {
    const result = await pool.query(createActivitiesTableQuery);
    console.log("🎉 activities table created successfully");
  } catch (error) {
    console.error("⚠️ error creating activities table", error);
  }
};

const createTripsDestinationsTable = async () => {
  const createTripsDestinationsTableQuery = `
      CREATE TABLE IF NOT EXISTS trips_destinations (
          trip_id int NOT NULL,
          destination_id int NOT NULL,
          PRIMARY KEY (trip_id, destination_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (destination_id) REFERENCES destinations(id) ON UPDATE CASCADE
      );
  `;
  try {
    const result = await pool.query(createTripsDestinationsTableQuery);
    console.log("🎉 trips_destinations table created successfully");
  } catch (error) {
    console.error("⚠️ error creating trips_destinations table", error);
  }
};

const createUsersTable = async () => {
  const createUsersTableQuery = `
      CREATE TABLE  IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,        
    githubid INTEGER,              
    username VARCHAR(100),         
    avatarurl VARCHAR(500),      
    accesstoken VARCHAR(500)      
);
  `;
  try {
    const result = await pool.query(createUsersTableQuery);
    console.log("🎉 users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating users table", error);
  }
};

const createTripsUsersTable = async () => {
  const createTableText = `
      CREATE TABLE IF NOT EXISTS trips_users (
          trip_id int NOT NULL,
          user_id int NOT NULL,
          PRIMARY KEY (trip_id, user_id),
          FOREIGN KEY (trip_id) REFERENCES trips(id) ON UPDATE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE
      );
  `;
  try {
    const result = await pool.query(createTableText);
    console.log("🎉 trips_users table created successfully");
  } catch (error) {
    console.error("⚠️ error creating trips_users table", error);
  }
};

seedTripsTable();
createDestinationsTable();
createActivitiesTable();
createTripsDestinationsTable();
createUsersTable();
createTripsUsersTable();
