const express = require('express');
const router = express.Router();

const specVetController = require('../controllers/specVetController');


router.get('/', specVetController.showSpecVetsList);
router.get('/add', specVetController.showAddSpecVetForm);
router.get('/edit/:specVetId', specVetController.showEditSpecVetForm);
router.get('/details/:specVetId', specVetController.showSpecVetDetails);

router.post('/add', specVetController.addSpecVet); 
router.post('/edit', specVetController.updateSpecVet);
router.get('/delete/:specVetId', specVetController.deleteSpecVet);


module.exports = router;