const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/error.js");
const jwt = require('jsonwebtoken')

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
exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password!',
            });
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

    } catch (error) {
        next(error);
    }
};