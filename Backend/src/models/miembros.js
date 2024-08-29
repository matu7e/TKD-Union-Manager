const { sql } = require('./../config/bdHelper');

// Crear un nuevo miembro
async function crearMiembro(miembro) {
    const { DNI, Nombres, Apellidos, FechaNacimiento, GrupoSanguineo, Telefono, Email, Direccion, TutorID, InstitutoID, CintoID, RolID, Estado, LocalidadID } = miembro;
    try {
      await sql.query`
        INSERT INTO Miembros (DNI, Nombres, Apellidos, FechaNacimiento, GrupoSanguineo, Telefono, Email, Direccion, TutorID, InstitutoID, CintoID, RolID, Estado, LocalidadID)
        VALUES (${DNI}, ${Nombres}, ${Apellidos}, ${FechaNacimiento}, ${GrupoSanguineo}, ${Telefono}, ${Email}, ${Direccion}, ${TutorID}, ${InstitutoID}, ${CintoID}, ${RolID}, ${Estado}, ${LocalidadID})
      `;
      console.log('Miembro creado correctamente.');
    } catch (err) {
      console.error('Error al crear miembro:', err);
    }
  }

// Leer todos los miembros
async function getMiembros() {
    try {
      const result = await sql.query`SELECT * FROM Miembros`;
      return result.recordset;
    } catch (err) {
      console.error('Error al obtener miembros:', err);
    }
  }

// Actualizar un miembro
async function updateMember(id, miembro) {
    const { Nombres, Apellidos, FechaNacimiento, GrupoSanguineo, Telefono, Email, Direccion, TutorID, InstitutoID, CintoID, RolID, Estado, LocalidadID } = miembro;
    try {
      await sql.query`
        UPDATE Miembros 
        SET Nombres = ${Nombres}, Apellidos = ${Apellidos}, FechaNacimiento = ${FechaNacimiento}, GrupoSanguineo = ${GrupoSanguineo}, 
            Telefono = ${Telefono}, Email = ${Email}, Direccion = ${Direccion}, TutorID = ${TutorID}, InstitutoID = ${InstitutoID}, 
            CintoID = ${CintoID}, RolID = ${RolID}, Estado = ${Estado}, LocalidadID = ${LocalidadID}
        WHERE DNI = ${id}
      `;
      console.log('Miembro actualizado correctamente.');
    } catch (err) {
      console.error('Error al actualizar miembro:', err);
    }
  }

// Eliminar un miembro
async function eliminarMiembro(id) {
    try {
      await sql.query`DELETE FROM Miembros WHERE DNI = ${id}`;
      console.log('Miembro eliminado correctamente.');
    } catch (err) {
      console.error('Error al eliminar miembro:', err);
    }
  }

module.exports = { crearMiembro, getMiembros, updateMember, eliminarMiembro };
