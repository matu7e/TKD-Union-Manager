const express = require('express');
const router = express.Router();
const tutoresController = require('../controllers/tutoresController');

// Ruta para obtener todos los tutores
router.get('/', tutoresController.getAll);

// Ruta para obtener un tutor por su DNI
router.get('/:dni_tutor', tutoresController.getByDni);

// Ruta para registrar un nuevo tutor
router.post('/', tutoresController.create);

// Ruta para actualizar un tutor
router.put('/:dni_tutor', tutoresController.update);

// Ruta para eliminar un tutor
router.delete('/:dni_tutor', tutoresController.remove);

module.exports = router;
