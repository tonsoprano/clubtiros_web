const express = require('express');

const ApiController = require('../app/controllers/ApiController');
const router = express.Router();

router.post('/login', ApiController.login);
router.post('/requestBooking', ApiController.requestBooking);

module.exports = router;