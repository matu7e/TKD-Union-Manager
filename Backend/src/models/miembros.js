const { sql } = require('./../config/bdHelper');

// Crear un nuevo miembro
async function crearMiembro(miembro) {
  const { dni, Nombre, Apellido, FechaNacimiento, GrupoSanguineo, Telefono, Email, Direccion, TutorID, relacion_tutor, password } = miembro;
  const fecha = new Date();
      try {
      await sql.query`
        INSERT INTO Miembros (dni_miembro, nombre, apellido, fecha_nacimiento, grupo_sanguineo, 
                              telefono, email, direccion, dni_tutor, relacion_tutor, 
                              id_escuela, id_cinto, id_rol, activo, password, fecha_alta)
        VALUES (${dni}, ${Nombre}, ${Apellido}, ${FechaNacimiento}, ${GrupoSanguineo}, ${Telefono}, ${Email}, ${Direccion}, ${TutorID}, ${relacion_tutor},null, 1, 1, 0, ${password}, ${fecha})
        `;

      console.log('Miembro creado correctamente.');
    } catch (err) {
      console.error('Error al crear miembro:', err);
    }
  }

// Leer todos los miembros
async function getMiembros() {
    try {
      const result = await sql.query`SELECT m.dni_miembro, m.nombre, m.apellido, m.telefono, m.email, 
        m.fecha_nacimiento, m.grupo_sanguineo, m.direccion, m.imagen, m.fecha_alta, m.activo,
    m.ficha_medica,
    r.descripcion AS rol,
    c.descripcion AS cinto,
    e.nombre AS escuela,
    m.dni_tutor,
    m.relacion_tutor
  FROM 
    Miembros m
  LEFT JOIN 
    Roles r ON m.id_rol = r.id_rol
  LEFT JOIN 
    Cintos c ON m.id_cinto = c.id_cinto
  LEFT JOIN
    Escuelas e ON m.id_escuela = e.id_escuela`;
      return result.recordset;
    } catch (err) {
      console.error('Error al obtener miembros:', err);
    }
  }

// Actualizar un miembro TENGO QUE ACTUALIZAR ESTO DEBIDO A LOS CAMBIOS EN LA BD
async function updateMember(dni, miembro) {
    const { telefono, email, direccion, dni_tutor, id_escuela, id_cinto} = miembro;
    try {
      await sql.query`
        UPDATE Miembros 
        SET 
        telefono = ${telefono}, 
        email = ${email}, 
        direccion = ${direccion}, 
        dni_tutor = ${dni_tutor}, 
        id_escuela = ${id_escuela}, 
        id_cinto = ${id_cinto}
        WHERE dni_miembro = ${dni}
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

  async function getBydni(dni) {
    try {
        const result = await sql.query`SELECT m.dni_miembro, m.nombre, m.apellido, m.telefono, m.email, 
        m.fecha_nacimiento, m.grupo_sanguineo, m.direccion, m.imagen, m.fecha_alta, m.activo,
    m.ficha_medica,
    r.descripcion AS rol,
    c.descripcion AS cinto,
    e.nombre AS escuela,
    m.dni_tutor,
    m.relacion_tutor
  FROM 
    Miembros m
  LEFT JOIN 
    Roles r ON m.id_rol = r.id_rol
  LEFT JOIN 
    Cintos c ON m.id_cinto = c.id_cinto
  LEFT JOIN
    Escuelas e ON m.id_escuela = e.id_escuela
  WHERE dni_miembro = ${dni}`;

        // Verificar si la consulta devolvió algún resultado
        if (!result || result.recordset.length === 0) {
            console.log('No existe miembro con ese dni');
            return null;
        }
        return result.recordset[0];  // Retornar el primer resultado
    } catch (err) {
        console.error('Hubo un error al obtener el miembro:', err);
        throw err;
    }
}

async function getLogin(dni) {
  try {
      const result = await sql.query`SELECT m.dni_miembro, m.activo, r.descripcion AS rol, m.password 
      FROM Miembros m LEFT JOIN Roles r ON m.id_rol = r.id_rol
      WHERE dni_miembro = ${dni}`;

      // Verificar si la consulta devolvió algún resultado
      if (!result || result.recordset.length === 0) {
          console.log('Usuario incorrecto');
          return null;
      }
      return result.recordset[0];  // Retornar el primer resultado
  } catch (err) {
      console.error('Error en base de datos:', err);
      throw err;
  }
}

  async function cargaImagen(dni, ruta) {
    try{
      await sql.query`UPDATE Miembros SET imagen = ${ruta} WHERE dni_miembro = ${dni}`;
      console.log('Ruta de imagen cargada correctamente')
    } catch(err){
      console.error('Error al cargar la ruta: ', err)
    }
  }

  async function cargaFichaMedica(dni, ruta) {
    try{
      console.log("Dni a ingresar: ", dni);
      console.log("Ruta del pdf: ", ruta)
      await sql.query`UPDATE Miembros SET ficha_medica = ${ruta} WHERE dni_miembro = ${dni}`;
      console.log('Ficha medica cargada con exito')
    } catch(err){
      console.error('Error al cargar la ficha medica: ', err)
    }
  }
module.exports = { crearMiembro, getMiembros, updateMember, eliminarMiembro, asignarEscuela, getBydni, getLogin,cargaImagen, cargaFichaMedica };
