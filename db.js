const mongoose = require("mongoose");

require("dotenv").config();

// const mongoURL = "mongodb://localhost:27017/hotels";

const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

db.on("disconnected", () => {
  console.log("Mongo DB Connection Disconnected");
});

db.on("error", (err) => {
  console.log("Mongo DB Connection Error", err);
});

module.exports = db;
