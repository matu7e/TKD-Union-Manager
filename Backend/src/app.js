// El archivo que se encarga de configurar la aplicación y cargar las rutas.

const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDatabase } = require('./config/bdHelper');

const cintosRoutes = require('./routes/rutasCintos')
const tutoresRoutes = require('./routes/rutasTutores');


const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


connectToDatabase();

app.use('/cintos', cintosRoutes);
app.use('/tutores', tutoresRoutes);
app.use('/escuelas', escuelasRoutes);


module.exports = app;