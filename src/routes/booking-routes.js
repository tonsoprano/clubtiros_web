const express = require('express');

const BookingController = require('../app/controllers/BookingController');
const router = express.Router();

router.get('/get-bookings', BookingController.getBookings);

module.exports = router;