const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

/* GET all data */
app.get("/api/add", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM moh");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error retrieving data");
  }
});

/* MODIFY data */
app.post("/api/modify", async (req, res) => {
  try {
    const { id, name } = req.body;

    const result = await db.query(
      "UPDATE moh SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error updating data");
  }
});

/* DELETE data */
app.delete("/api/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await db.query("DELETE FROM moh WHERE id = $1", [id]);

    res.send("Deleted successfully");
  } catch (err) {
    res.status(500).send("Error deleting data");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});