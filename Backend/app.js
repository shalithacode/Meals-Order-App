const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
require("dotenv").config();

const Menu = require("./models/meal");
const Order = require("./models/order");
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

app.post(
  "/orders",
  [
    body("order").notEmpty().withMessage("Order data is required."),
    body("order.items").isArray({ min: 1 }).withMessage("Order must contain at least one item."),
    body("order.customer.name").trim().notEmpty(),
    body("order.customer.street").trim().notEmpty(),
    body("order.customer.postal-code").trim().notEmpty().isInt(),
    body("order.customer.city").trim().notEmpty(),
    body("order.customer.email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed.");
      error.statusCode = 422;
      error.info = errors.array();
      throw error;
    }
    try {
      const orderData = req.body.order;

      const customer = {
        name: orderData.customer.name.trim(),
        email: orderData.customer.email.trim(),
        street: orderData.customer.street.trim(),
        postalCode: orderData.customer["postal-code"],
        city: orderData.customer.city.trim(),
      };

      const newOrder = new Order({
        items: orderData.items,
        customer: customer,
      });

      const savedOrder = await newOrder.save();
      res.status(201).json({ message: "Order created!", order: savedOrder });
    } catch (err) {
      if (!err.statusCode) statusCode = 500;
      next(err);
    }
  }
);

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
