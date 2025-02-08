const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  userType: { type: String, enum: ["landlord", "tenant"], required: true },
});

module.exports = mongoose.model("User", UserSchema);