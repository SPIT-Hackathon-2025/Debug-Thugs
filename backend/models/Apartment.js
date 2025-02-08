const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema({
  landlord: { type: String, required: true },
  address: { type: String, required: true },
  rent: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Apartment", ApartmentSchema);