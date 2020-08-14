const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: String,

  googleReference: String,
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;

