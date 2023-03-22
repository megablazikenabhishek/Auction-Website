const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  product_name: String,
  date: { type: Date, default: new Date() },
  time_stamp: Date,
  photos: { type: Array, default: [] },
  details: String,
  base_price: Number,
  sold: { type: Boolean, default: false },
  expired: { type: Boolean, default: false },
  sent: { type: Boolean, default: false },
  location: String,

  // bid section
  seller: {
    name: String,
    _id: String,
  },
  current_bid: {
    amount: Number,
    name: { type: String, default: "-none-" },
    user_id: { type: String, default: "-none" },
  },
  winner: {
    name: { type: String, default: "-none-" },
    _id: { type: String, default: "-none-" },
    amount: Number,
  },
});

let Item = mongoose.model("Items", ItemSchema);

module.exports = Item;
