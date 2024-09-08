const Escuela = require('../models/escuelas');
const Localidad = require('../models/localidades');
const Georef = require('../middleware/georefSerice');

async function create(req, res) {
  const escuelaData = req.body;
  const { localidadID, id_provincia } = escuelaData;

  try {
    // Verificar si la localidad ya existe
    let localidad = await Localidad.getByID(localidadID);

    // Si no existe, crear la nueva localidad
    if (!localidad) {
      localidad = Georef.getLocalidadByID(localidadID);
      const newLocalidadId = await Localidad.createLocalidad(localidad);
      escuelaData.localidad = newLocalidadId;
    } else {
      // Si existe, asignar el ID de la localidad existente
      escuelaData.localidad = localidad.id_localidad;
    }

    // Crear la nueva escuela con el ID de la localidad
    await Escuela.createEscuela(escuelaData);

    res.status(201).send('Escuela creada con éxito');
  } catch (err) {
    console.error('Error al crear escuela:', err);
    res.status(500).send('Error al crear escuela');
  }
}

// Actualizar una escuela
async function update(req, res) {
    const id_escuela = req.params.id_escuela;
    const escuelaData = req.body;
    try {
      await Escuela.updateEscuela(id_escuela, escuelaData);
      res.send('Escuela actualizada con éxito');
    } catch (err) {
      res.status(500).send('Error al actualizar escuela');
    }
  }
  
  // Eliminar una escuela
  async function remove(req, res) {
    const id_escuela = req.params.id_escuela;
    try {
      await Escuela.deleteEscuela(id_escuela);
      res.send('Escuela eliminada con éxito');
    } catch (err) {
      res.status(500).send('Error al eliminar escuela');
    }
  }
  
  // Obtener una escuela por su ID
async function getByLocalidad(req, res) {
    const id_localidad = req.params.id_localidad;
    try {
      const escuela = await Escuela.getEscuelasByLocalidad(id_localidad)
      if (!escuela) {
        res.status(404).send('No hay escuelas en esa localidad');
      } else {
        res.json(escuela);
      }
    } catch (err) {
      res.status(500).send('Error al obtener escuela');
    }
  }

  module.exports = {
    getByLocalidad,
    create,
    update,
    remove,
  };