
const Listing = require("../models/listing.model.js");

exports.createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    if (error.name === "ValidationError") {
      // If the error is due to validation, return a 400 Bad Request status
      return res.status(400).json({ message: error.message });
    }
    // For other errors, pass it to the error handling middleware
    next(error);
  }
};
