//imports
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connection = require("./dbConfig");
const todoRoutes = require("./routes/todoRoutes.js");

app.use(cors());
app.use(express.json());

//todo routes
app.use("/", todoRoutes);

//connecting to local mysql db
connection.connect((err) => {
  if (err) return console.error("error: " + err.message);
  console.log("connected to mysql");
});

//starting server
app.listen(3001, () => {
  console.log("server running on port " + 3000);
});
