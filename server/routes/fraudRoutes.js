const express = require('express');
const router = express.Router();
const fraudController = require('../controllers/fraudController');

// Route to handle fraud analysis requests using IPQS
router.post('/analyze', fraudController.analyzeFraudWithIPQS);

module.exports = router;