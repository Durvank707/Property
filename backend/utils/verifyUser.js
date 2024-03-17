const jwt = require("jsonwebtoken");
const {errorHandler} = require('./error.js')

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(res.status(401).json({
        success: false,
        message: "Token missing"
    }));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(res.status(403).json({
            status:false,
            message:"Token verification went wrong"
        }));

        req.user = user;
        next();
    });
};