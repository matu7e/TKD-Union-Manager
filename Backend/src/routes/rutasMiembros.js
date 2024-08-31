const express = require('express');
const router = express.Router();
const miembrosController = require('../controllers/miembrosController');

router.post('/miembros', miembrosController.registrarMiembro);
router.get('/miembros', miembrosController.obtenerTodos);

module.exports = router;