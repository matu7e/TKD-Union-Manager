const Publicacion = require('../models/publicaciones');

// Crear una nueva publicación
async function crearPublicacion(req, res) {
    const publicacionData = req.body; // Recibe el cuerpo de la solicitud con la información de la publicación

    try {
        await Publicacion.createPublicacion(publicacionData);
        res.status(201).send('Publicación creada con éxito');
    } catch (err) {
        console.error('Error al crear la publicación:', err);
        res.status(500).send('Error al crear la publicación');
    }
}

// Obtener todas las publicaciones
async function getAll(req, res) {
    try {
        const publicaciones = await Publicacion.getAllPublicaciones();
        res.status(200).json(publicaciones);
    } catch (err) {
        console.error('Error al obtener las publicaciones:', err);
        res.status(500).send('Error al obtener las publicaciones');
    }
}

// Obtener una publicación por ID
async function getById(req, res) {
    const { id_publicacion } = req.params;

    try {
        const publicacion = await Publicacion.getPublicacionById(id_publicacion);
        if (!publicacion) {
            return res.status(404).send('Publicación no encontrada');
        }
        res.status(200).json(publicacion);
    } catch (err) {
        console.error('Error al obtener la publicación:', err);
        res.status(500).send('Error al obtener la publicación');
    }
}

// Actualizar una publicación
async function actualizarPublicacion(req, res) {
    const { id_publicacion } = req.params;
    const publicacionData = req.body; // Recibe el cuerpo de la solicitud con los datos actualizados

    try {
        const publicacionExistente = await Publicacion.getPublicacionById(id_publicacion);
        if (!publicacionExistente) {
            return res.status(404).send('Publicación no encontrada');
        }

        await Publicacion.updatePublicacion(id_publicacion, publicacionData);
        res.status(200).send('Publicación actualizada con éxito');
    } catch (err) {
        console.error('Error al actualizar la publicación:', err);
        res.status(500).send('Error al actualizar la publicación');
    }
}

// Eliminar una publicación
async function eliminarPublicacion(req, res) {
    const { id_publicacion } = req.params;

    try {
        const publicacionExistente = await Publicacion.getPublicacionById(id_publicacion);
        if (!publicacionExistente) {
            return res.status(404).send('Publicación no encontrada');
        }

        await Publicacion.deletePublicacion(id_publicacion);
        res.status(200).send('Publicación eliminada con éxito');
    } catch (err) {
        console.error('Error al eliminar la publicación:', err);
        res.status(500).send('Error al eliminar la publicación');
    }
}

module.exports = {
    crearPublicacion,
    getAll,
    getById,
    actualizarPublicacion,
    eliminarPublicacion
};
