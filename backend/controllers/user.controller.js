const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/error.js");

exports.updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(res.status(401).json({
            success: false,
            message: "User don't match"
        }));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};