const Miembro = require('../models/miembros');

//Obtener los Miembros
async function obtenerTodos(req, res) {
    try{    
        const miembros = await Miembro.getMiembros();
        res.json(miembros);
    } catch (err){
        res.status(500).send('Error al obtener miembros');
    }
    
}async function registrarMiembro(req, res) {
    const datosMiembro = req.body;

    try{    
        await Miembro.crearMiembro(datosMiembro);
        res.status(201).send('Se registro al miembro exitosamente');
    } catch (err){
        res.status(500).send('Problemas para registrar el miembro');
    }
    
}

module.exports = { obtenerTodos, registrarMiembro}