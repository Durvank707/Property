const mongoose = require('mongoose')
require("dotenv").config();


const dbConnect = () => {
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("connected successfully")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = dbConnect;

