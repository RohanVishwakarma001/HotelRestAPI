const express = require("express");

const app = express();

const db = require("./db");

var bodyParser = require("body-parser");

require("dotenv").config();

app.use(bodyParser.json()); //req.body

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

const personRoute = require("./routes/PersonRouute");
const menuRoute = require("./routes/MenuRoute");

app.use("/person", personRoute);
app.use("/menu", menuRoute);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
