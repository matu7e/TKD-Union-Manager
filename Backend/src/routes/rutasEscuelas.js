const express = require('express');
const router = express.Router();
const escuelasController = require('../controllers/escuelasController');

// Ruta para obtener una escuela por su Localidad
router.get('/:id_localidad', escuelasController.getByLocalidad);

// Ruta para registrar una nueva escuela
router.post('/', escuelasController.create);

// Ruta para actualizar una escuela
router.put('/:id_escuela', escuelasController.update);

// Ruta para eliminar una escuela
router.delete('/:id_escuela', escuelasController.remove);

module.exports = router;
