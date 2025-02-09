const mongoose = require("mongoose");

const ApartmentSchema = new mongoose.Schema({
    landlord: { type: String, required: true }, // wallet address
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        coordinates: {
            lat: { type: Number },
            lng: { type: Number }
        }
    },
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, default: 'ETH' }
    },
    features: [{
        type: String
    }],
    images: [{ type: String }],
    availability: {
        isAvailable: { type: Boolean, default: true },
        availableFrom: { type: Date },
        availableTo: { type: Date }
    },
    propertyType: { type: String, enum: ['apartment', 'house', 'studio', 'room'] },
    amenities: [{
        type: String
    }],
    rules: [{ type: String }],
    reviews: [{
        tenant: { type: String }, // wallet address
        rating: { type: Number },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Apartment", ApartmentSchema);
