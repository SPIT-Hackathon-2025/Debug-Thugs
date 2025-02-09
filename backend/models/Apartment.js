const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    tenantAddress: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const apartmentSchema = new mongoose.Schema({
    landlordAddress: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        address: String,
        city: String,
        state: String,
        zipCode: String
    },
    rent: {
        type: Number,
        required: true
    },
    depositAmount: {
        type: Number,
        required: true
    },
    images: [{
        type: String // Base64 encoded images or URLs
    }],
    available: {
        type: Boolean,
        default: true
    },
    currentTenant: {
        address: String,
        rentDueDate: Number, // Day of month
        leaseStart: Date,
        leaseEnd: Date
    },
    reviews: [reviewSchema],
    amenities: [String],
    contractAddress: String
}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);
