const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileManager');
const miembrosController = require('../controllers/miembrosController');

router.post('/', miembrosController.registrarMiembro);
router.get('/', miembrosController.obtenerTodos);
router.put('/:dni/asignarEscuela/:id_escuela', miembrosController.asignarEscuela);
router.post('/login', miembrosController.loginMiembro);
router.put('/:dni', miembrosController.actualizarMiembro);
router.post('/:dni_miembro/cargaImagen', upload.single('imagen'), miembrosController.cargarImagen);
router.post('/:dni_miembro/cargaFichaMedica', upload.single('ficha_medica'), miembrosController.cargarFichaMedica);
router.put('/:dni/completo', miembrosController.actualizarMiembroCompleto);


router.get('/buscar', miembrosController.buscarMiembros);
router.get('/:dni', miembrosController.obtenerByDni);
router.put('/subirPrivilegios/:dni_miembro', miembrosController.subirPrivilegios);
router.delete('/:dni_miembro', miembrosController.eliminarMiembro);
router.put('/bajarPrivilegios/:dni_miembro', miembrosController.bajarPrivilegios);

router.post('/solicitarCambioPassw', miembrosController.solicitarCambioPassw);
router.post('/cambiarPassw', miembrosController.cambioPassw);

router.get('/cambiarPassw/:token') //Queda para el front
module.exports = router;