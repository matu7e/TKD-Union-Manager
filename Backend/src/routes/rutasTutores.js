const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutoresController');

router.get('/', tutoresController.getAll);

router.get('/:dni_tutor', tutoresController.getByDni);

router.post('/', tutoresController.create);

router.put('/:dni_tutor', tutoresController.update);

router.delete('/:dni_tutor', tutoresController.remove);

module.exports = router;
