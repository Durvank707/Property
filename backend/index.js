const express = require("express");
require('dotenv').config();

const app = express();
app.use(express.json());

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

const dbConnect = require('./config/database');
dbConnect()

const userRoutes = require('./routes/user.route.js')
const authRoutes = require('./routes/auth.route.js')

app.use("/api/auth",authRoutes)
app.use("/api/user", userRoutes)


app.listen(4000, ()=>{
    console.log("Listening to 4000!!")
})