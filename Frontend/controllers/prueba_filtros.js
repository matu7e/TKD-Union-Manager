// GET Miembro con búsqueda por DNI u otros parámetros
async function fetchUserData(dni, token) {
    const url = new URL(`${API_BASE_URL}/miembros/buscar`); // Ajusta la ruta si es necesario
    
    // Agregar los parámetros de búsqueda (query string)
    if (dni) url.searchParams.append('dni_miembro', dni);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.statusText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al buscar el miembro:', error);
        throw error;
    }
}