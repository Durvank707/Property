const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
            
            //In MongoDB, error code 11000 corresponds to a duplicate key error.
            //The keyPattern is MongoDB's way of indicating which index or constraint caused the duplicate key error.
            
            return res.status(400).json({
                success: false,
                message: "Username is already taken",
            });
        }
        next(error);
    }
};
