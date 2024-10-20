const { sql } = require('../config/bdHelper');

// Obtener todas las escuelas
async function getAllEscuelas() {
  try {
    const result = await sql.query`
      SELECT e.id_escuela, e.nombre, m.nombre AS nombre_instructor, m.apellido AS apellido_instructor, e.email_escuela, e.telefono_escuela, e.enlace, e.logo_escuela, e.fecha_de_alta
      FROM Escuelas e
      LEFT JOIN Miembros m ON e.dni_instructor = m.dni_miembro
    `;
    return result.recordset;
  } catch (err) {
    console.error('Error al obtener escuelas:', err);
    throw err;
  }
}

// Crear una nueva escuela
async function createEscuela(escuela) {
  const { nombre, dni_instructor, email, telefono, enlace, logo} = escuela;
  const fecha = new Date();
  try {
    await sql.query`
      INSERT INTO Escuelas (nombre, dni_instructor, email_escuela, telefono_escuela, enlace, logo_escuela, fecha_de_alta)
      VALUES (${nombre}, ${dni_instructor}, ${email}, ${telefono}, ${enlace}, ${logo}, ${fecha})
    `;
    console.log('Escuela creada correctamente.');
  } catch (err) {
    console.error('Error al crear escuela:', err);
    throw err;
  }
}

// Actualizar una escuela por su ID
async function updateEscuela(id_escuela, escuela) {
  const { dni_instructor, email, telefono, enlace, logo} = escuela;
  try {
    await sql.query`
      UPDATE Escuelas
      SET dni_instructor = ${dni_instructor}, email_escuela = ${email}, telefono_escuela = ${telefono},
          enlace = ${enlace}, logo_escuela = ${logo}
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

async function getEscuelaById(id_escuela) {
    try {
        const request = new sql.Request();
        request.input('id_escuela', sql.Int, id_escuela); // id_escuela es de tipo entero

        const result = await request.query(`
            SELECT e.id_escuela, e.nombre, m.nombre AS nombre_instructor, m.apellido AS apellido_instructor, e.email_escuela, e.telefono_escuela, e.enlace, e.logo_escuela, e.fecha_de_alta
            FROM Escuelas e
            LEFT JOIN Miembros m ON e.dni_instructor = m.dni_miembro 
            WHERE e.id_escuela = ${id_escuela}
        `);

        return result.recordset[0]; // Retornamos solo la primera coincidencia
    } catch (err) {
        console.error("Error al obtener la escuela por ID: ", err);
    }
}

async function cargaLogo(id_escuela, ruta) {
  try{
    await sql.query`UPDATE Escuelas SET logo_escuela = ${ruta} WHERE id_escuela = ${id_escuela}`;
    console.log('Logo cargado correctamente')
  } catch(err){
    console.error('Error al cargar la ruta: ', err)
  }
}

module.exports = {
  getAllEscuelas,
  createEscuela,
  updateEscuela,
  deleteEscuela,
  getEscuelaById,
  cargaLogo
};
