const Tutor = require('../models/tutores');

// Obtener todos los tutores
async function getAll(req, res) {
  try {
    const tutores = await Tutor.getAllTutores();
    res.json(tutores);
  } catch (err) {
    res.status(500).send('Error al obtener tutores');
  }
}

// Obtener un tutor por su DNI
async function getByDni(req, res) {
  const dni_tutor = req.params.dni_tutor;
  try {
    const tutor = await Tutor.getTutorByDni(dni_tutor);
    if (!tutor) {
      res.status(404).send('Tutor no encontrado');
    } else {
      res.json(tutor);
    }
  } catch (err) {
    res.status(500).send('Error al obtener tutor');
  }
}

// Registrar un nuevo tutor
async function create(req, res) {
  const tutorData = req.body;
  try {
    const tutorExistente = await Tutor.getTutorByDni(tutorData.dni_tutor);
    if (tutorExistente) {
      return res.status(409).send('El tutor con este DNI ya existe');
    }

    await Tutor.createTutor(tutorData);
    res.status(201).send('Tutor creado con éxito');
  } catch (err) {
    res.status(500).send('Error al crear tutor');
  }
}

// Actualizar un tutor
async function update(req, res) {
  const dni_tutor = req.params.dni_tutor;
  const tutorData = req.body;
  try {
    await Tutor.updateTutor(dni_tutor, tutorData);
    res.send('Tutor actualizado con éxito');
  } catch (err) {
    res.status(500).send('Error al actualizar tutor');
  }
}

// Eliminar un tutor
async function remove(req, res) {
  const dni_tutor = req.params.dni_tutor;
  try {
    await Tutor.deleteTutor(dni_tutor);
    res.send('Tutor eliminado con éxito');
  } catch (err) {
    res.status(500).send('Error al eliminar tutor');
  }
}

module.exports = {
  getAll,
  getByDni,
  create,
  update,
  remove,
};
