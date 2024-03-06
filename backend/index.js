const express = require("express");
require('dotenv').config();

const app = express();

const dbConnect = require('./config/database');
dbConnect()

const Routes = require('./routes/user.route.js')
app.use("/api/v1", Routes)


app.listen(3000, ()=>{
    console.log("Listening to 3000!!")
})