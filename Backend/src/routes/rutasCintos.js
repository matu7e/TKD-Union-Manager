const express = require('express');
const router = express.Router();
const cintosController = require('../controllers/cintosController');
const {validarAdministrador, validarInstructor, validarMiembro} = require('../middleware/authToken');

// Ruta para obtener todos los cintos
router.get('/', cintosController.getAll);

// Ruta para obtener un cinto por su ID
router.get('/:id', cintosController.getById);

module.exports = router;
