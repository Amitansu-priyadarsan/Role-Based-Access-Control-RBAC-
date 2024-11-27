const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

router.get('/admin', authMiddleware, roleMiddleware(['Admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome, Admin!' });
});

router.get('/user', authMiddleware, roleMiddleware(['User', 'Admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome, User!' });
});

module.exports = router;
