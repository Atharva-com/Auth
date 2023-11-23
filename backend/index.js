const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/profile.js');
const cookieParser = require('cookie-parser');
var cors = require('cors')

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB Connected!');
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());

app.listen(8000, () => {
    console.log('Port Listening on port no. 8000!');
})
app.use(cors())
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})




