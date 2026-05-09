const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "unihub"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }

  console.log("Connected to UniHub database");
});

app.get("/api/trains", (req, res) => {
  db.query(`
    SELECT departure_time, destination, platform, operator, days_running, notes
    FROM TrainTimetable
    ORDER BY departure_time
  `, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

app.get("/api/facilities/:name", (req, res) => {
  db.query(`
    SELECT *
    FROM FacilityHours
    WHERE facility_name = ?
  `, [req.params.name], (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

app.get("/api/events", (req, res) => {
  db.query(`
    SELECT *
    FROM StudentEvents
    ORDER BY event_date
  `, (err, results) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});