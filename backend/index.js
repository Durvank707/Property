const express = require("express");
require('dotenv').config();

const app = express();
app.use(express.json());

const dbConnect = require('./config/database');
dbConnect()

const userRoutes = require('./routes/user.route.js')
const authRoutes = require('./routes/auth.route.js')

app.use("/api/auth",authRoutes)
app.use("/api/user", userRoutes)


app.listen(3000, ()=>{
    console.log("Listening to 3000!!")
})