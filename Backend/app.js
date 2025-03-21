const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World..");
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️ Server is Started on Port : ${process.env.PORT}⚙️`);
});
