const sql = require('mssql');

// Configuración de la base de datos
// const config = {
  // user: 'principal', 
  // password: 'Analistas1', 
 //  server: 'nodo1.database.windows.net', 
 //  database: 'Principal', 
  // options: {
   //  encrypt: true, // necesario para Azure
   //  trustServerCertificate: false,
   //  enableArithAbort: true
  // }
// };

// Conexión a la base de datos
// async function connectToDatabase() {
  // try {
   //  await sql.connect(config);
   //  console.log('Conectado a la base de datos.');
  // } catch (err) {
  //   console.error('Error de conexión con la base de datos:', err);
  // }
// }

// module.exports = { connectToDatabase, sql };



const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Principal', 'root', '7YndXSMhg4SfF5I8Lc2REy5l4YygFyIFtYWlfHhQ9MRFF9h', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar a MySQL:', error);
  }
}

module.exports = { connectToDatabase };


