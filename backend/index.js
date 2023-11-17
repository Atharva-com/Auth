const express = require('express')
const mongoose=require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth.js');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB Connected!');
}).catch((err) => {
    console.log(err);
}) 

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
    console.log('Port Listening on port no. 3000!');
})


