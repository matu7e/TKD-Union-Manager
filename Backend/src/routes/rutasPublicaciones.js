const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicacionesController');

// Rutas del ABMC de Publicaciones
router.get('/', publicacionesController.getAll);
router.get('/:id_publicacion', publicacionesController.getById);
router.post('/', publicacionesController.crearPublicacion);
router.put('/:id_publicacion', publicacionesController.actualizarPublicacion);
router.delete('/:id_publicacion', publicacionesController.eliminarPublicacion);

module.exports = router;
