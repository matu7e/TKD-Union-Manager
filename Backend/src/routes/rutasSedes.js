const express = require('express');
const router = express.Router();
const sedesController = require('../controllers/sedesController');
const {validarAdministrador, validarInstructor, validarMiembro} = require('../middleware/authToken');

// Rutas del ABMC de Sedes
router.get('/', sedesController.getAll);
router.get('/id/:id_sede', sedesController.getById);
router.post('/', sedesController.create);
router.put('/:id_sede', sedesController.update);
router.delete('/:id_sede', sedesController.remove);
router.get('/:id_localidad', sedesController.getByLocalidad);

module.exports = router;
