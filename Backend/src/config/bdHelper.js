const sql = require('mssql');

// Configuración de la base de datos
const config = {
  user: 'principal', 
  password: 'Analistas1', 
  server: 'nodotdk.database.windows.net', 
  database: 'unionTKM', 
  options: {
     encrypt: true, // necesario para Azure
     trustServerCertificate: false,
     enableArithAbort: true
   }
};

// Conexión a la base de datos
async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log('Conectado a la base de datos.');
   } catch (err) {
      console.error('Error de conexión con la base de datos:', err);
   }
 }

module.exports = { connectToDatabase, sql };

