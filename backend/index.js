const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth.js');
const { createProxyMiddleware } = require('http-proxy-middleware');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB Connected!');
}).catch((err) => {
    console.log(err);
})

const app = express();
app.use(express.json());

app.listen(8000, () => {
    console.log('Port Listening on port no. 3000!');
})

// Define the proxy route
// app.use(
//     '/api', // Replace '/api' with your API endpoint
//     createProxyMiddleware({
//         target: 'http://localhost:8000', // Replace with your proxy server URL
//         changeOrigin: true,
//     })
// );

app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})




