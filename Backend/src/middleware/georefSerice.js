const axios = require('axios');

// URL base de la API
const BASE_URL = 'https://apis.datos.gob.ar/georef/api';

async function getProvinciaById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/provincias?id=${id}`);
    return response.data.provincias[0];
  } catch (err) {
    console.error('Error al obtener provincia:', err);
    throw err;
  }
}

async function getLocalidadByID(id) {
  try {
    const response = await axios.get(`${BASE_URL}/localidades?id=${id}&campos=id,nombre,provincia.id`);
    const data = await response.json();
    return data.localidades.map(localidad => ({
      id: localidad.id,
      nombre: localidad.nombre,
      id_provincia: localidad.provincia.id
    }));
    } catch (err) {
    console.error('Error al obtener localidad:', err);
    throw err;
  }
}

async function getLocalidadesPorProvincia(req, res) {
  const { id_provincia } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/localidades`, {
      params: {
        provincia: id_provincia,
        campos: 'id, nombre',
        max: 600
      }
    });
    const localidades = response.data.localidades.map(localidad => ({
      id: localidad.id,
      nombre: localidad.nombre,
    }));
    return res.json(localidades);
  } catch (err) {
    console.error('Error al obtener las localidades: ', err.message);
    return res.status(500).json({ error: 'Error al obtener las localidades' });
  }
}

async function getProvincias(req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/provincias?campos=id,nombre`);
    const provincias = response.data.provincias;

    return res.json(provincias); // Enviar la lista de provincias como respuesta JSON
  } catch (err) {
    console.error('Error al obtener las provincias: ', err);
    return res.status(500).json({ error: 'Error al obtener las provincias' });
  }
}

module.exports = {
  getProvinciaById,
  getLocalidadByID,
  getLocalidadesPorProvincia,
  getProvincias
};
