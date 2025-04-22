const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Menu = require("./models/meal");

const app = express();

app.use(cors());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

app.get("/meals", async (req, res) => {
  try {
    const response = await Menu.find();
    res.status(200).json({ meals: response });
  } catch (err) {
    if (!err.statusCode) statusCode = 500;
    next(err);
  }
});
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message, data });
});
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.erpgzd4.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then((result) => {
    // console.log(result);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
