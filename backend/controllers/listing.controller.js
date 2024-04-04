
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

exports.deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(res.status(401).json({
            success: false,
            message: "Listing not found"
        }))
    }

    if (req.user.id !== listing.userRef) {
        return next(res.status(401).json({
            success: false,
            message: "You can delete your own listings only"
        }))
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Listing deleted successfully"
        })
    }
    catch (error) {
        next(error);
    }
}

exports.updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }
        // if (req.user.id !== listing.userRef) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "You can update your own listings only"
        //     });
        // }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedListing) {
            return res.status(404).json({
                success: false,
                message: "Failed to update listing"
            });
        }

        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

exports.getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

exports.getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;
        let offer = req.query.offer;

        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;

        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;

        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;

        if (type === undefined || type === 'all') {
            type = { $in: ['sale', 'rent'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            furnished,
            parking,
            type,
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};