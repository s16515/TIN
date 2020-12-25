const express = require('express');
const router = express.Router();

const vetController = require('../controllers/vetController');


router.get('/', vetController.showVetsList);
router.get('/add', vetController.showAddVetForm);
router.get('/edit/:empId', vetController.showEditVetForm); //??
//router.get('/details/:empId', vetController.showVetDetails);

module.exports = router;