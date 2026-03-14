const express = require("express");
const cors = require("cors");
const path = require("path");


const notesRoutes = require("./routes/notes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/notes", notesRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});