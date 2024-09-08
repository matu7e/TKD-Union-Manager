const { sql } = require('../config/db');

// Obtener todas las escuelas
async function getAllEscuelas() {
  try {
    const result = await sql.query`
      SELECT e.*, l.nombre as localidad
      FROM Escuelas e
      LEFT JOIN Localidades l ON e.localidad = l.id_localidad
    `;
    return result.recordset;
  } catch (err) {
    console.error('Error al obtener escuelas:', err);
    throw err;
  }
}

// Obtener una escuela por su Localidad
async function getEscuelasByLocalidad(id_localidad) {
  try {
    const result = await sql.query`
      SELECT e.*, l.nombre as localidad
      FROM Escuelas e
      LEFT JOIN Localidades l ON e.localidad = l.id_localidad
      WHERE e.id_localidad = ${id_localidad}
    `;
    return result.recordset[0];
  } catch (err) {
    console.error('Error al obtener escuela:', err);
    throw err;
  }
}

// Crear una nueva escuela
async function createEscuela(escuela) {
  const { nombre, dni_instructor, email, telefono, direccion, enlace, logo, localidad, fecha_de_alta } = escuela;
  try {
    await sql.query`
      INSERT INTO Escuelas (nombre, dni_instructor, email, telefono, direccion, enlace, logo, localidad)
      VALUES (${nombre}, ${dni_instructor}, ${email}, ${telefono}, ${direccion}, ${enlace}, ${logo}, ${localidad}, ${fecha_de_alta})
    `;
    console.log('Escuela creada correctamente.');
  } catch (err) {
    console.error('Error al crear escuela:', err);
    throw err;
  }
}

// Actualizar una escuela por su ID
async function updateEscuela(id_escuela, escuela) {
  const { nombre, dni_instructor, email, telefono, direccion, enlace, logo, localidad } = escuela;
  try {
    await sql.query`
      UPDATE Escuelas
      SET nombre = ${nombre}, dni_instructor = ${dni_instructor}, email = ${email}, telefono = ${telefono},
          direccion = ${direccion}, enlace = ${enlace}, logo = ${logo}, localidad = ${localidad}
      WHERE id_escuela = ${id_escuela}
    `;
    console.log('Escuela actualizada correctamente.');
  } catch (err) {
    console.error('Error al actualizar escuela:', err);
    throw err;
  }
}

// Eliminar una escuela por su ID
async function deleteEscuela(id_escuela) {
  try {
    await sql.query`DELETE FROM Escuelas WHERE id_escuela = ${id_escuela}`;
    console.log('Escuela eliminada correctamente.');
  } catch (err) {
    console.error('Error al eliminar escuela:', err);
    throw err;
  }
}

module.exports = {
  getAllEscuelas,
  getEscuelasByLocalidad,
  createEscuela,
  updateEscuela,
  deleteEscuela,
};
