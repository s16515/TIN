const express = require('express');
const router = express.Router();

const specController = require('../controllers/specController');

router.get('/', specController.showSpecsList);
router.get('/add', specController.showAddSpecForm);
router.get('/edit/:specId', specController.showEditSpecForm);

module.exports = router;