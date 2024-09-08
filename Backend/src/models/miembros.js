const { sql } = require('./../config/bdHelper');

// Crear un nuevo miembro
async function crearMiembro(miembro) {
  const { DNI, Nombres, Apellidos, FechaNacimiento, GrupoSanguineo, Telefono, Email, Direccion, TutorID, InstitutoID, CintoID, RolID, Estado, Password, FichaMedica } = miembro;
      try {
      await sql.query`
        INSERT INTO Miembros (dni_miembro, nombre, apellido, fecha_nacimiento, grupo_sanguineo, 
                              telefono, email, direccion, dni_tutor, realacion_tutor, 
                              id_escuela, id_cinto, id_rol, activo, password, ficha_medica)
        VALUES (${DNI}, ${Nombres}, ${Apellidos}, ${FechaNacimiento}, ${GrupoSanguineo}, ${Telefono}, ${Email}, ${Direccion}, ${TutorID}, ${InstitutoID}, ${CintoID}, ${RolID}, ${Estado}, ${Password}, ${FichaMedica})
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

// Actualizar un miembro TENGO QUE ACTUALIZAR ESTO DEBIDO A LOS CAMBIOS EN LA BD
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

  async function asignarEscuela(dni, escuela_id) {
    const escuela = escuela_id;
    const miembro = dni;
    try{  
      await sql.query`
      UPDATE Miembros SET id_escuela = ${escuela} WHERE dni = ${miembro}
      `;
    console.log('Escuela asignada con exito');
    } catch (err){
      console.error('Error al asignar la escuela: ', err)
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

module.exports = { crearMiembro, getMiembros, updateMember, eliminarMiembro, asignarEscuela };
