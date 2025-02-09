const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const apartmentSchema = new mongoose.Schema({
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
        zipCode: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    price: {
        amount: Number,
        currency: {
            type: String,
            default: 'ETH'
        }
    },
    images: [{
        type: String // GridFS file IDs
    }],
    availability: {
        isAvailable: {
            type: Boolean,
            default: true
        },
        availableFrom: Date,
        availableTo: Date
    },
    propertyType: String,
    amenities: [String],
    rules: [String],
    reviews: [reviewSchema],
    contractAddress: String, // Smart contract address
    depositAmount: Number,
    rentDueDate: Number, // Day of month
    currentTenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rentalAgreementHash: String // IPFS hash of rental agreement
}, { timestamps: true });

module.exports = mongoose.model("Apartment", apartmentSchema);
