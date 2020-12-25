const express = require('express');
const router = express.Router();

const specVetController = require('../controllers/specVetController');
router.get('/add', specVetController.showAddSpecVetForm);
router.get('/details/:empId', specVetController.showVetDetails);

module.exports = router;