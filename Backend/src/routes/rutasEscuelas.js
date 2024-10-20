const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileManager');
const escuelasController = require('../controllers/escuelasController');

router.get('/', escuelasController.getAll)
router.post('/', escuelasController.crearEscuela);
router.put('/:id_escuela', escuelasController.update);
router.delete('/:id_escuela', escuelasController.remove);
router.get('/:id_localidad', escuelasController.getByLocalidad);
router.post('/:id_escuela/cargaLogo', upload.single('logo'), escuelasController.cargarLogo);

module.exports = router;
