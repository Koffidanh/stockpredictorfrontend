const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockSchema = new Schema({
  ticker: {
    type: String,
    required: true,
  },
  actual: [
    {
      type: Schema.Types.Decimal128, // Using Decimal128 for decimal numbers
      required: true,
    },
  ],
  predictions: [
    {
      type: Schema.Types.Decimal128, // Using Decimal128 for decimal numbers
      required: true,
    },
  ],
  last_trained: {
    type: Date,
    required: true,
  },
  loss: {
    type: Number,
    required: true,
  },
});

const Stocks = mongoose.model("Stocks", StockSchema);
module.exports = Stocks;
