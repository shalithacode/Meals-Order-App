const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.erpgzd4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
