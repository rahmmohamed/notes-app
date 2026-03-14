const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
 const result = await db.query("SELECT * FROM notes ORDER BY id DESC");
 res.json(result.rows);
});

router.post("/", async (req, res) => {
 const { title, content } = req.body;

 const result = await db.query(
  "INSERT INTO notes(title,content) VALUES($1,$2) RETURNING *",
  [title, content]
 );

 res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
 const { id } = req.params;

 await db.query("DELETE FROM notes WHERE id=$1", [id]);

 res.json({ message: "deleted" });
});

module.exports = router;