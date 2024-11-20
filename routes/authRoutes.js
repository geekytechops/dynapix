const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
const authController = require('../controllers/authController')

router.post('/login_validate',authController.login);

module.exports = router;