const express = require("express");

const app = express();

const db = require("./db");

var bodyParser = require("body-parser");

require("dotenv").config();

app.use(bodyParser.json()); //req.body

const port = process.env.PORT || 3000;

//Home Route

app.get("/", (req, res) => {
  res.send("Welcome to our Hotel");
});

//Middleware Function

const logRequest = (req, res, next) => {
  console.log(
    `${req.method} method is requested at ${
      req.url
    } on ${new Date().toLocaleString()}`
  );
  next();
};

//Routes

const personRoute = require("./routes/PersonRouute");
const menuRoute = require("./routes/MenuRoute");

app.use(logRequest);

app.use("/person", personRoute);
app.use("/menu", menuRoute);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
