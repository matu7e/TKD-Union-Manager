const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileManager');
const miembrosController = require('../controllers/miembrosController');
const {validarAdministrador, validarInstructor, validarMiembro} = require('../middleware/authToken');


// Rutas que no necesitan token:
router.post('/login', miembrosController.loginMiembro);
router.post('/solicitarCambioPassw', miembrosController.solicitarCambioPassw);
router.post('/cambiarPassw', miembrosController.cambioPassw);
router.get('/cambiarPassw/:token')
router.post('/', miembrosController.registrarMiembro);

// Rutas para los miembros:
router.put('/:dni/asignarEscuela/:id_escuela', validarMiembro, miembrosController.asignarEscuela);
router.put('/:dni', validarMiembro, miembrosController.actualizarMiembro);
router.post('/:dni_miembro/cargaImagen', validarMiembro, upload.single('imagen'), miembrosController.cargarImagen);
router.post('/:dni_miembro/cargaFichaMedica', validarMiembro, upload.single('ficha_medica'), miembrosController.cargarFichaMedica);

// Rutas para Instructores
router.get('/',  validarInstructor, miembrosController.obtenerTodos);
router.get('/buscar', validarInstructor, miembrosController.buscarMiembros);
router.get('/:dni', validarInstructor, miembrosController.obtenerByDni);
router.put('/subirPrivilegios/:dni_miembro', validarInstructor, miembrosController.subirPrivilegios);
router.put('/bajarPrivilegios/:dni_miembro', validarInstructor, miembrosController.bajarPrivilegios);

// Rutas para Administradores
router.put('/:dni/completo', validarAdministrador,miembrosController.actualizarMiembroCompleto);
router.delete('/:dni_miembro', validarAdministrador,miembrosController.eliminarMiembro);


module.exports = router;