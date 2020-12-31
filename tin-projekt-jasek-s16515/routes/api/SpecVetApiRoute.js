const express = require('express');
const router = express.Router();

const specVetApiController = require('../../api/SpecVetAPI');

router.get('/', specVetApiController.getSpecVets);
router.get('/:specVetId', specVetApiController.getSpecVetById);
router.post('/', specVetApiController.createSpecVet);
router.put('/:specVetId', specVetApiController.updateSpecVet);
router.delete('/:specVetId', specVetApiController.deleteSpecVet);

module.exports = router;