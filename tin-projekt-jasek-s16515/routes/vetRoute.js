const express = require('express');
const router = express.Router();

const vetController = require('../controllers/vetController');


router.get('/', vetController.showVetsList);
router.get('/add', vetController.showAddVetForm);
router.get('/details/:vetId', vetController.showVetDetails);
router.get('/edit/:vetId', vetController.showEditVetForm); 
router.get('/SpecVet/editPage/:vetId', vetController.showEditSpecVetPage); 
router.get('/SpecVet/edit/:specVetId', vetController.showEditSpecVetForm); 
router.get('/SpecVet/add/:vetId', vetController.showAddSpecVetForm);


router.post('/add', vetController.addVet); 
router.post('/edit', vetController.updateVet);
router.get('/delete/:vetId', vetController.deleteVet);


module.exports = router;