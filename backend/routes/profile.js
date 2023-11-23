const express = require('express');
const { updateUser, deleteUser } = require('../controllers/updateUser');

const router = express.Router();

router.post("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)


module.exports = router;