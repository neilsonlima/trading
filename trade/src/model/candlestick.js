const mongoose = require('mongoose')
const candlestickSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  symbol: {type: String, index: true, required: true},
  prices: [],
  volume: {type: Number},
  created: {
    type: Date,
    default: Date.now
  }
});
const Candlesticks = mongoose.model('Candlesticks', candlestickSchema)

module.exports = Candlesticks
