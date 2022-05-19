const mongoose = require("mongoose");

const pricesObject = new mongoose.Schema({
  prix_moy: Number,
  prix_max: Number,
  prix_min: Number
});

const DistrictSchema = new mongoose.Schema({
  code: { type: String, required: true },
  label: String,
  prices: { type: Map, of: pricesObject }
});

const District = mongoose.model('District', DistrictSchema);

module.exports = { District };