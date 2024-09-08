const Miembro = require('../models/miembros');

//Obtener los Miembros
async function obtenerTodos(req, res) {
    try{    
        const miembros = await Miembro.getMiembros();
        res.json(miembros);
    } catch (err){
        res.status(500).send('Error al obtener miembros');
    }
    
}
async function registrarMiembro(req, res) {
    const datosMiembro = req.body;

    try{    
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
module.exports = { obtenerTodos, registrarMiembro, asignarEscuela}