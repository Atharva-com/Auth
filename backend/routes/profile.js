const express = require('express');
const { verifyToken } = require('../utils/verifyToken');
const { updateUser } = require('../controllers/updateUser');

const router = express.Router();

router.post("/update/:id", verifyToken, updateUser)

module.exports = router;