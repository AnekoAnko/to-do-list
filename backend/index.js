import bodyParser from "body-parser";
import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("https://localhost:5177"))
app.use(bodyParser.json());
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.get("/getData", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tasks ORDER BY id ASC");
    console.log("Tasks fetched:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.log("Error querying the database", err.stack);
    res.status(500).send("Server error");
  }
});

app.post("/sendData", async (req, res) => {
  const task = req.body.task;
  const duration = req.body.duration;
  try {
    const result = await db.query("INSERT INTO tasks (task, duration) VALUES ($1, $2) RETURNING *", [task, duration]);
    console.log("Task inserted:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.log("Error querying the database", err.stack);
    res.status(500).send("Server error");
  }
});

app.put("/updateData/:id", async (req, res) => {
  const id = req.params.id;
  const task = req.body.task;
  try {
    const result = await db.query("UPDATE tasks SET task = $1 WHERE id = $2 RETURNING *", [task, id]);
    res.json(result.rows);
  } catch (err) {
    console.log("Error querying the database", err.stack);
    res.status(500).send("Server error");
  }
  
});

app.delete("/deleteData/:id", async (req, res) => {
  const id = req.params.id
  try {
    const result = await db.query("DELETE FROM tasks WHERE id = $1 RETURNING *",[id]);
    console.log("Tasks fetched:", result.rows);
    res.json(result.rows);
  } catch (err) {
    console.log("Error querying the database", err.stack);
    res.status(500).send("Server error");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
