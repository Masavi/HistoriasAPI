const express = require("express");
const bodyParser = require("body-parser");
const autores = require('./routes/autor_routes.js');
const historias = require("./routes/historia_routes.js");
const app = express();

// parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parsear application/json
app.use(bodyParser.json());

// setear manejador de rutas en autores e historias
app.use('/autores', autores);
app.use('/historias', historias);

// usar puerto 3000 a menos que exista un puerto preconfigurado
app.set('port', process.env.PORT || 3000);

// Página raíz del servidor
app.get('/', (req, res) => {
    res.status(200).send('Bienvenido a la API de Historias');  
});

// exporto aplicación de express para usar en index
module.exports = app;