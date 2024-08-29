const express = require('express');
const { connectToDatabase } = require('./src/config/bdHelper');
const { getMiembros, crearMiembro, eliminarMiembro } = require('./src/models/miembros');
//const { createMember, getMembers, updateMember, deleteMember } = require('./members');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Conectar a la base de datos
connectToDatabase();
/*
// Rutas de la API
app.post('/miembros', async (req, res) => {
  const { nombre, email } = req.body;
  await createMember(nombre, email);
  res.send('Miembro creado');
});

app.get('/miembros', async (req, res) => {
  const miembros = await getMembers();
  res.json(miembros);
});

app.put('/miembros/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  await updateMember(id, nombre, email);
  res.send('Miembro actualizado');
});

app.delete('/miembros/:id', async (req, res) => {
  const { id } = req.params;
  await deleteMember(id);
  res.send('Miembro eliminado');
});
*/

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Crear un nuevo miembro
app.post('/miembros', async (req, res) => {
    const miembro = req.body;
    await crearMiembro(miembro);
    res.send('Miembro creado');
  });

// Obtener todos los miembros
app.get('/miembros', async (req, res) => {
    const miembros = await getMiembros();
    res.json(miembros);
  });

  // Actualizar un miembro
app.put('/miembros/:id', async (req, res) => {
    const { id } = req.params;
    const miembro = req.body;
    await updateMember(id, miembro);
    res.send('Miembro actualizado');
  });
  
  // Eliminar un miembro
  app.delete('/miembros/:id', async (req, res) => {
    const { id } = req.params;
    await eliminarMiembro(id);
    res.send('Miembro eliminado');
  });
  