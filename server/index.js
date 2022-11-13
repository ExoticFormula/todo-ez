const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());
const todoRoutes = require("./routes/todoRoutes.js");
app.use("/", todoRoutes);
const sqlconnection = require("./dbConfig");

sqlconnection.connect((err) => {
  if (err) return console.error("error: " + err.message);
  console.log("connected to mysql");
});

app.listen(3001, () => {
  console.log("server running on port " + 3000);
});
