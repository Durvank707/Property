const User = require("../models/user.model.js");
const bcryptjs = require('bcryptjs');
const { errorHandler } = require("../utils/error.js");
const Listing = require("../models/listing.model.js");

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

exports.deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(res.status(401).json({
            success: false,
            message: "You can delete only your account"
        }));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};

exports.getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
      try {
        const listings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(listings);
      } catch (error) {
        next(error);
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized permission"
      })
    }
  };

  exports.getUser = async (req, res, next) => {
    try {
      
      const user = await User.findById(req.params.id);
    
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
    
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };  