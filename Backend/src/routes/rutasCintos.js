const express = require('express');
const router = express.Router();
const cintosController = require('../controllers/cintosController');

// Ruta para obtener todos los cintos
router.get('/', cintosController.getAll);

// Ruta para obtener un cinto por su ID
router.get('/:id', cintosController.getById);

module.exports = router;
