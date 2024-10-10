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
<<<<<<< HEAD
router.post('/:id_publicacion/cargaImagen', upload.single('imagen'), miembrosController.cargarImagen);
=======
router.post('/:id_publicacion/cargaImagen', upload.single('imagen'), publicacionesController.cargarImagen);

>>>>>>> 54a2d0db3d7ff84ab4454c2562aea8b72266a555

                                                                       
module.exports = router;
