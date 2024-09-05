const { sql } = require('../config/bdHelper');

// Obtener todos los tutores
async function getAllTutores() {
  try {
    const result = await sql.query`SELECT * FROM Tutores`;
    return result.recordset;
  } catch (err) {
    console.error('Error al obtener tutores:', err);
    throw err;
  }
}

// Obtener un tutor por su DNI
async function getTutorByDni(dni_tutor) {
  try {
    const result = await sql.query`SELECT * FROM Tutores WHERE dni_tutor = ${dni_tutor}`;
    return result.recordset[0];
  } catch (err) {
    console.error('Error al obtener tutor:', err);
    throw err;
  }
}

// Crear un nuevo tutor
async function createTutor(tutor, transaction = null) {
    const { dni_tutor, nombre, apellido, telefono } = tutor;
    const query = `
      INSERT INTO Tutores (dni_tutor, nombre, apellido, telefono)
      VALUES (@dni_tutor, @nombre, @apellido, @telefono);
    `;
    const request = transaction ? new sql.Request(transaction) : sql;
    
    await request.input('dni_tutor', sql.Int, dni_tutor)
                 .input('nombre', sql.VarChar, nombre)
                 .input('apellido', sql.VarChar, apellido)
                 .input('telefono', sql.Int, telefono)
                 .query(query);
    
    return tutor;
  }
  

// Actualizar un tutor por su DNI
async function updateTutor(dni_tutor, tutor) {
  const { nombre, apellido, telefono } = tutor;
  try {
    await sql.query`
      UPDATE Tutores
      SET nombre = ${nombre}, apellido = ${apellido}, telefono = ${telefono}
      WHERE dni_tutor = ${dni_tutor}
    `;
    console.log('Tutor actualizado correctamente.');
  } catch (err) {
    console.error('Error al actualizar tutor:', err);
    throw err;
  }
}

// Eliminar un tutor por su DNI
async function deleteTutor(dni_tutor) {
  try {
    await sql.query`DELETE FROM Tutores WHERE dni_tutor = ${dni_tutor}`;
    console.log('Tutor eliminado correctamente.');
  } catch (err) {
    console.error('Error al eliminar tutor:', err);
    throw err;
  }
}

module.exports = {
  getAllTutores,
  getTutorByDni,
  createTutor,
  updateTutor,
  deleteTutor,
};
