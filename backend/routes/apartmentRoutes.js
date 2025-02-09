const express = require("express");
const { createApartment, searchApartments, getImage } = require("../controllers/apartmentController");

const router = express.Router();

router.post("/create", createApartment);
router.get("/search", searchApartments);
router.get("/image/:id", getImage);

module.exports = router;
