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

async function getLocalidadByNombre(nombre) {
  try {
    const response = await axios.get(`${BASE_URL}/localidades?nombre=${nombre}`);
    return response.data.localidades[0];
  } catch (err) {
    console.error('Error al obtener localidad:', err);
    throw err;
  }
}

async function getLocalidadesPorProvincia(id_provincia) {
  try {
    const response = await axios.get(`${BASE_URL}/municipios?`, {
      params: {
        provincia: id_provincia,
        campos: 'id,nombre',
        max: 1000, // Número máximo de localidades a devolver por solicitud
      },
    });
    return response.data.localidades;
  } catch (err) {
    console.error('Error al obtener localidades por provincia:', err);
    throw err;
  }
}

async function getProvincias() {
    try {
      const response = await axios.get(`${BASE_URL}/provincias`);
      return response.data.provincias[0];
    } catch (err) {
      console.error('Error al obtener las provincias: ', err);
      throw err;
    }
  }

module.exports = {
  getProvinciaById,
  getLocalidadByNombre,
  getLocalidadesPorProvincia,
  getProvincias
};
