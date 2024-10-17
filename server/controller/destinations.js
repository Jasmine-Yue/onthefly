/*
GET requests at /destinations that calls the getDestinations function
GET requests at /destinations/:id that calls the getDestination function
POSTS requests at /destinations that calls the createDestination function
DELETE requests at /destinations/:id that calls the deleteDestination function
PATCH requests at /destinations/:id that calls the updateDestination function
   CREATE TABLE IF NOT EXISTS destinations (
          id serial PRIMARY KEY,
          destination varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          city varchar(100) NOT NULL,
          country varchar(100) NOT NULL,
          img_url text NOT NULL,
          flag_img_url text NOT NULL
      );
   */

// GET requests at /destinations that calls the getDestinations function
const getDestinations = async (req, res) => {
  const sqlText = "select * from destinations order by id ASC";
  try {
    const results = pool.query(sqlText);
    res.status(200).json(res.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// GET requests at /destinations/:id that calls the getDestination function
const getDestination = async (req, res) => {
  const id = parseInt(req.params.id);
  const sqlText = "select * from destinations where id=$1 returning * ";
  try {
    const results = pool.query(sqlText, [id]);
    res.status(200).json(res.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// POSTS requests at /destinations that calls the createDestination function destinations
/*   CREATE TABLE IF NOT EXISTS destinations (
          id serial PRIMARY KEY,
          destination varchar(100) NOT NULL,
          description varchar(500) NOT NULL,
          city varchar(100) NOT NULL,
          country varchar(100) NOT NULL,
          img_url text NOT NULL,
          flag_img_url text NOT NULL
      );*/
const createDestination = async (req, res) => {
  const { destination, description, city, country, img_url, flag_img_url } =
    req.body;
  const insertTableText = `
    insert into destinations(destination,description,city,country,img_url,flag_img_url)
     values($1,$2,$3,$4,$5,$6)
    returning *
    `;
  const values = [
    destination,
    description,
    city,
    country,
    img_url,
    flag_img_ur,
  ];
  try {
    const results = await pool.query(insertTableText, values);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// DELETE requests at /destinations/:id that calls the deleteDestination function
const deleteDestination = async (req, res) => {
  const id = parseInt(req.params.id);
  const sqlText = `
    delete from destinations where id=$1
    returning *
    `;
  try {
    const results = await pool.query(sqlText, [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
// PATCH requests at /destinations/:id that calls the updateDestination function
const updateDestination = async (req, res) => {
  const { destination, description, city, country, img_url, flag_img_url } =
    req.body;

  const id = parseInt(req.params.id);

  const updateTableText = `
    update destinations set destination=$1, description=$2, city=$3, country=$4, img_url=$5, flag_img_url=$6
    where id=$8
    returning *
    `;
  const values = [
    destination,
    description,
    city,
    country,
    img_url,
    flag_img_url,
    id,
  ];
  try {
    const results = await pool.query(updateTableText, values);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export default {
  getDestinations,
  getDestination,
  createDestination,
  deleteDestination,
  updateDestination,
};
