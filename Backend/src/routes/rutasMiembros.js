const express = require('express');
const router = express.Router();
const miembrosController = require('../controllers/miembrosController');

router.post('/', miembrosController.registrarMiembro);
router.get('/', miembrosController.obtenerTodos);
router.put('/:dni/asignarEscuela/:id_escuela', miembrosController.asignarEscuela);
router.post('/login', miembrosController.loginMiembro);
router.get('/:dni', miembrosController.obtenerByDni);
router.put('/:dni', miembrosController.actualizarMiembro);

module.exports = router;