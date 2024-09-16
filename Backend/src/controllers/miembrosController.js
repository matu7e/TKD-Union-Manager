const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Miembro = require('../models/miembros');

const JWT_SECRET = 'AnalistasNoIngenieros';

async function obtenerTodos(req, res) {
    try{    
        const miembros = await Miembro.getMiembros();
        res.json(miembros);
    } catch (err){
        res.status(500).send('Error al obtener miembros');
    }
    
}

async function obtenerByDni(req, res) {
    try{
        const dni = req.params.dni;    
        const miembros = await Miembro.getBydni(dni);
        res.json(miembros);
    } catch (err){
        res.status(500).send('Error al obtener miembros');
    }
}

async function registrarMiembro(req, res) {
    const datosMiembro = req.body;

    try{
        // Generar el hash de la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(datosMiembro.password, salt);
 
        // Reemplazar la contraseña original con la hasheada
        datosMiembro.password = hashedPassword;
        await Miembro.crearMiembro(datosMiembro);

        res.status(201).send('Se registro al miembro exitosamente');
    } catch (err){
        res.status(500).send('Problemas para registrar el miembro');
    }
    
}
async function asignarEscuela(req, res) {
    const dni_miembro = req.params.dni;
    const escuela = req.params.id_escuela;
    try{
        await Miembro.asignarEscuela(dni_miembro, escuela);
        res.send('Escuela asignada con exito')
    } catch (err){
        res.status(500).send('No se pudo asignar la escuela');
    }
    
}

async function loginMiembro(req, res) {
    const { dni, password } = req.body;

    try {
        const miembro = await Miembro.getBydni(dni);
        if (!miembro) {
            return res.status(404).send('El dni o la contraseña son incorrectos');
        }

        // Comparar la contraseña ingresada con el hash almacenado
        const esValida = await bcrypt.compare(password, miembro.password);

        if (!esValida) {
            return res.status(401).send('El dni o la contraseña son incorrectos');
        }
        const token = jwt.sign({ dni: miembro.dni_miembro, rol: miembro.rol }, JWT_SECRET, { expiresIn: '2h' }); 

        res.status(200).json({token});
        
    } catch (err) {
        res.status(500).send('Problemas en el inicio de sesión');
    }
}

async function actualizarMiembro(req, res) {
    const dni = req.params.dni; // Obtener el DNI de los parámetros de la ruta
    const datosMiembro = req.body; // Obtener los datos del cuerpo de la solicitud

    try {
        // Llamar a la función del modelo para actualizar al miembro
        await Miembro.updateMember(dni, datosMiembro);
        
        res.status(200).send('Miembro actualizado correctamente');
    } catch (err) {
        console.error('Error al actualizar miembro:', err);
        res.status(500).send('Error al actualizar miembro');
    }
}

module.exports = { obtenerTodos, registrarMiembro, asignarEscuela, loginMiembro, obtenerByDni, actualizarMiembro}