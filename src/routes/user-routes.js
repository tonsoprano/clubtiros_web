const express = require('express');

const router = express.Router();
const UserController = require('../app/controllers/UserController');
const PartnerController = require('../app/controllers/PartnerController');

router.post('/login', UserController.login);
router.post('/request-inscription', UserController.requestInscription);
router.get('/get-inscriptions', PartnerController.getInscriptions);
router.post('/update-state-inscription', PartnerController.updateStateInscription);

module.exports = router;
