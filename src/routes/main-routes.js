const express = require('express');

const PageController = require('../app/controllers/PageController');
const router = express.Router();

router.get('/', PageController.renderLogin);
router.get('/logout', PageController.renderLogout);
router.get('/inscription', PageController.renderInscription);
router.get('/index', PageController.renderIndex);
router.get('/bookings', PageController.renderBookings);

module.exports = router;