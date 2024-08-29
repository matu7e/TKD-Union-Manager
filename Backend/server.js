// Este es el archivo que se encarga de inicilizar el servidor.

const app = require('./src/app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
