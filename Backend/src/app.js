// El archivo que se encarga de configurar la aplicación y cargar las rutas.

const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./config/database');


/* EJEMPLO
const herramientasRoutes = require('./routes/herramientas');
const ctfsRoutes = require('./routes/ctfs');
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
*/
const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* EJEMPLO
app.use('/herramienta', herramientasRoutes);
app.use('/ctf', ctfsRoutes);
app.use('/auth', authRoutes);
app.use('/progress', progressRoutes);
*/
async function inicializarBaseDeDatos() {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida correctamente.');
        await sequelize.sync();
    } catch (error) {
        console.error('No se pudo establecer la conexión:', error);
    }
}

inicializarBaseDeDatos();

module.exports = app;