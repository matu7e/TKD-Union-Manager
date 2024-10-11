const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileManager');
const publicacionesController = require('../controllers/publicacionesController');
const miembrosController = require('../controllers/miembrosController');

// Rutas del ABMC de Publicaciones
router.get('/', publicacionesController.getAll);
router.get('/:id_publicacion', publicacionesController.getById);
router.post('/', publicacionesController.crearPublicacion);
router.put('/:id_publicacion', publicacionesController.actualizarPublicacion);
router.delete('/:id_publicacion', publicacionesController.eliminarPublicacion);
router.post('/:id_publicacion/cargaImagen', upload.single('imagen'), publicacionesController.cargarImagen);


                                                                       
module.exports = router;
