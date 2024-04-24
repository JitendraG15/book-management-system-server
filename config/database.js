const mongoose = require("mongoose");
require("dotenv").config();
const db_url = process.env.MONGODB_URL;

exports.connect = () => {
  mongoose
    .connect(db_url)
    .then(console.log("Successfully connected to database!"))
    .catch((error) => {
      console.error("Error occured while connection to database", error);
    });
};
