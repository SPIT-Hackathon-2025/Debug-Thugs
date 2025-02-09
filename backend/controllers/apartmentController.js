const Apartment = require("../models/Apartment");
const { upload, gridfsBucket } = require('../config/gridfs');
const mongoose = require('mongoose');

// Upload images and create an apartment listing
exports.addApartment = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: "Error uploading images" });
    }

    try {
      const { title, description, location, rent } = req.body;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "At least one image is required" });
      }

      // Store image IDs from GridFS
      const imageIds = req.files.map((file) => file.id);

      const apartment = new Apartment({
        landlord: req.user ? req.user.id : null,
        title,
        description,
        location,
        rent,
        imageIds,
      });

      await apartment.save();
      res.status(201).json({ message: "Apartment added successfully", apartment });
    } catch (error) {
      res.status(500).json({ error: "Error adding apartment" });
    }
  });
};

// Fetch all apartments
exports.getApartments = async (req, res) => {
  try {
    const apartments = await Apartment.find().populate("landlord", "name email");
    res.json(apartments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching apartments" });
  }
};

// Get image by ID
exports.getImage = async (req, res) => {
    try {
        if (!gridfsBucket) {
            return res.status(500).json({ error: "GridFS not initialized" });
        }

        const _id = new mongoose.Types.ObjectId(req.params.id);
        const files = await gridfsBucket.find({ _id }).toArray();
        
        if (!files || files.length === 0) {
            return res.status(404).json({ error: "Image not found" });
        }

        const downloadStream = gridfsBucket.openDownloadStream(_id);
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ error: error.message });
    }
};

// Create apartment with images
exports.createApartment = async (req, res) => {
    try {
        upload.array('images', 5)(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            const {
                title,
                description,
                location,
                price,
                features,
                propertyType,
                amenities,
                rules
            } = req.body;

            // Get file IDs from uploaded files
            const imageIds = req.files ? req.files.map(file => file.id) : [];

            const apartment = new Apartment({
                landlord: req.user.walletAddress,
                title,
                description,
                location: JSON.parse(location),
                price: JSON.parse(price),
                features: JSON.parse(features),
                images: imageIds,
                propertyType,
                amenities: JSON.parse(amenities),
                rules: JSON.parse(rules)
            });

            await apartment.save();
            res.status(201).json(apartment);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Search apartments
exports.searchApartments = async (req, res) => {
    try {
        const {
            city,
            priceMin,
            priceMax,
            propertyType,
            amenities,
            availableFrom,
            availableTo
        } = req.query;

        let query = { "availability.isAvailable": true };

        if (city) query["location.city"] = new RegExp(city, 'i');
        if (priceMin || priceMax) {
            query["price.amount"] = {};
            if (priceMin) query["price.amount"].$gte = parseFloat(priceMin);
            if (priceMax) query["price.amount"].$lte = parseFloat(priceMax);
        }
        if (propertyType) query.propertyType = propertyType;
        if (amenities) query.amenities = { $all: amenities.split(',') };
        if (availableFrom) query["availability.availableFrom"] = { $lte: new Date(availableFrom) };
        if (availableTo) query["availability.availableTo"] = { $gte: new Date(availableTo) };

        const apartments = await Apartment.find(query)
            .sort({ createdAt: -1 })
            .limit(20);

        // Transform the response to include image URLs
        const apartmentsWithImageUrls = apartments.map(apt => ({
            ...apt.toObject(),
            images: apt.images.map(imageId => `/api/apartments/image/${imageId}`)
        }));

        res.json(apartmentsWithImageUrls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
