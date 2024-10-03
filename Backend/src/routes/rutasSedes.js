const express = require('express');
const router = express.Router();
const sedesController = require('../controllers/sedesController');

// Rutas del ABMC de Sedes
router.get('/', sedesController.getAll);
router.get('/:id_sede', sedesController.getById);
router.post('/', sedesController.create);
router.put('/:id_sede', sedesController.update);
router.delete('/:id_sede', sedesController.remove);

module.exports = router;
