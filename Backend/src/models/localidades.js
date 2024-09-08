const { sql } = require('../config/bdHelper');

// Obtener una localidad por id
async function getByID(id) {
  const result = await sql.query`SELECT * FROM Localidades WHERE id_localidad = ${id}`;
  return result.recordset[0];
}

// Crear una nueva localidad
async function createLocalidad(localidad) {
  const { id, nombre, id_provincia } = localidad;
  try {
    const result = await sql.query`
      SET IDENTITY_INSERT Provincias ON;

      INSERT INTO Localidades (id_localidad, id_provincia, nombre)
      VALUES (${id}, ${id_provincia}, ${nombre})
      OUTPUT INSERTED.id_localidad;
    `;
    return result.recordset[0].id_localidad;
  } catch (err) {
    console.error('Error al crear localidad:', err);
    throw err;
  }
}

module.exports = {
  getByID,
  createLocalidad,
};
