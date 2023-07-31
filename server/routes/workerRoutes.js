const express = require("express");
const { Client } = require("pg");

const router = express.Router();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT, // default PostgreSQL port
});

client.connect();

router.get("/getMedicines", async (req, res) => {
  const userID = req.query.userID;
  client.query(
    "SELECT * From medicines Where user_id = $1",
    [userID],
    (err, result) => {
      if (err) res.status(500);
      res.status(200).send(result);
    }
  );
});

router.post("/addMedicine", async (req, res) => {
  const newMedicine = {
    name: req.name,
    manName: req.manName,
    numOfPills: req.numOfPills,
    frequency: req.frequency,
    amount: req.amount,
  };
  client.query(
    "INSERT INTO medicines (medicine_name,manufacture_name,frequency,amount) VALUES ($1,$2,$3,$4)",
    [
      newMedicine.name,
      newMedicine.manName,
      newMedicine.numOfPills,
      newMedicine.frequency,
      newMedicine.amount,
    ],
    (err, result) => {
      if (err) res.status(500);
      res.status(200);
    }
  );
});

module.exports = router;
