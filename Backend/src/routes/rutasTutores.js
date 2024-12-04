const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutoresController');
const {validarAdministrador, validarInstructor, validarMiembro} = require('../middleware/authToken');

router.get('/', tutoresController.getAll);
router.get('/:dni_tutor', tutoresController.getByDni);
router.post('/', tutoresController.create);
router.put('/:dni_tutor', tutoresController.update);
router.delete('/:dni_tutor', tutoresController.remove);
router.put('/:dni_tutor/completo', tutoresController.updateCompleto);

module.exports = router;
