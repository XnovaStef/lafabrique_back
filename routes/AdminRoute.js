const express = require('express');
const router = express.Router();
const Admin = require('../Controllers/Admin');

// Define the routes
router.post('/create', Admin.createAdmin);
router.post('/login', Admin.loginAdmin);

module.exports = router;