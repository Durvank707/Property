 const User = require("../models/user.model.js");
 const bcryptjs = require('bcryptjs')

exports.signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const hashedPassword = await bcryptjs.hashSync(password,10);
        const newUser = new User({username, email, password: hashedPassword})
        await newUser.save();
        res.json({
            success:true,
            message: "User created"
        })
        
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            message: "User already exist OR server error",
          });
    }
}
 