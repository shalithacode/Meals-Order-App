const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    items: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu", // Reference to your Menu model
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
        },
        description: {
          type: String,
        },
        qty: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    customer: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
      },
      street: {
        type: String,
        required: true,
      },
      postalCode: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
