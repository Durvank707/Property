const express= require('express');
const router = express.Router();

const {createListing, deleteListing, updateListing, getListing} = require("../controllers/listing.controller.js");
const { verifyToken } = require('../utils/verifyUser.js');

router.post('/create',verifyToken, createListing)
router.delete('/delete/:id',verifyToken, deleteListing)
router.post('/update/:id',updateListing)
router.get('/get/:id', getListing);

module.exports = router;