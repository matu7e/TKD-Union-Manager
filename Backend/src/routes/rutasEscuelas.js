const express = require('express');
const router = express.Router();
const escuelasController = require('../controllers/escuelasController');


router.post('/', escuelasController.crearEscuela);
router.put('/:id_escuela', escuelasController.update);
router.delete('/:id_escuela', escuelasController.remove);

module.exports = router;
