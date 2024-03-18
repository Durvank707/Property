const express= require('express');
const router = express.Router();

const {updateUser, deleteUser} = require("../controllers/user.controller.js");
const { verifyToken } = require('../utils/verifyUser.js');

router.post("/update/:id",verifyToken, updateUser)
router.delete("/delete/:id",verifyToken, deleteUser)

module.exports = router;