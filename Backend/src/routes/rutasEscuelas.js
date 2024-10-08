const express = require('express');
const router = express.Router();
const escuelasController = require('../controllers/escuelasController');

router.get('/', escuelasController.getAll)
router.post('/', escuelasController.crearEscuela);
router.put('/:id_escuela', escuelasController.update);
router.delete('/:id_escuela', escuelasController.remove);
router.get('/:id_localidad', escuelasController.getByLocalidad);

module.exports = router;
