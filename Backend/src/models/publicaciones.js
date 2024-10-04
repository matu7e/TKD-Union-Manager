const { sql } = require('../config/bdHelper');

async function createPublicacion(publicacion) {
    const { titulo, descripcion, enlace, id_escuela } = publicacion;

    try {
        await sql.query`
            INSERT INTO Publicaciones (titulo, descripcion, enlace, id_escuela)
            VALUES (${titulo}, ${descripcion}, ${enlace}, ${id_escuela})
        `;
    } catch (err) {
        throw new Error('Error al crear la publicación');
    }
}

async function getAllPublicaciones() {
    try {
        const result = await sql.query`SELECT p.titulo, p.descripcion, p.imagen, p.enlace, e.nombre AS escuela 
        FROM Publicaciones p 
        JOIN LEFT Escuelas e ON p.id_escuela = e.id_escuela`;
        return result.recordset;
    } catch (err) {
        throw new Error('Error al obtener las publicaciones');
    }
}

async function getPublicacionById(id_publicacion) {
    try {
        const result = await sql.query`
            SELECT p.titulo, p.descripcion, p.imagen, p.enlace, e.nombre AS escuela 
        FROM Publicaciones p 
        JOIN LEFT Escuelas e ON p.id_escuela = e.id_escuela 
        WHERE id_publicacion = ${id_publicacion}
        `;
        return result.recordset[0];
    } catch (err) {
        throw new Error('Error al obtener la publicación');
    }
}

async function updatePublicacion(id_publicacion, publicacion) {
    const { titulo, descripcion, imagen, enlace, id_escuela } = publicacion;

    try {
        await sql.query`
            UPDATE Publicaciones
            SET titulo = ${titulo}, descripcion = ${descripcion}, imagen = ${imagen}, enlace = ${enlace}, id_escuela = ${id_escuela}
            WHERE id_publicacion = ${id_publicacion}
        `;
    } catch (err) {
        throw new Error('Error al actualizar la publicación');
    }
}

async function deletePublicacion(id_publicacion) {
    try {
        await sql.query`
            DELETE FROM Publicaciones WHERE id_publicacion = ${id_publicacion}
        `;
    } catch (err) {
        throw new Error('Error al eliminar la publicación');
    }
}

async function cargaImagen(id, ruta) {
    try{
      await sql.query`UPDATE Publicaciones SET imagen = ${ruta} WHERE id_publicaicon = ${id}`;
      console.log('Ruta de imagen cargada correctamente')
    } catch(err){
      console.error('Error al cargar la ruta: ', err)
    }
  }
module.exports = {
    getAllPublicaciones,
    getPublicacionById,
    createPublicacion,
    updatePublicacion,
    deletePublicacion,
    cargaImagen
};
