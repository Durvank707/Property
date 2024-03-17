const express= require('express');
const router = express.Router();

const {updateUser} = require("../controllers/user.controller.js");
const { verifyToken } = require('../utils/verifyUser.js');

router.post("/update/:id",verifyToken, updateUser)

module.exports = router;