const express = require('express');
const router = express.Router();

const vetApiController = require('../../api/VetAPI');

router.get('/', vetApiController.getVets);
router.get('/:vetId', vetApiController.getVetById);
router.post('/', vetApiController.createVet);
router.put('/:vetId', vetApiController.updateVet);
router.delete('/:vetId', vetApiController.deleteVet);

module.exports = router;