const express = require('express');
const cors = require('cors');
const path = require('path');
//const router = require('./routes/preSolicitudes');
const bodyParser = require('body-parser');
const preSolicitudes = require('./routes/preSolicitudes.js');

// Crear la conexión a la BD
const db = require('./config/db.js');

// Importar el modelo
require('./models/Solicitudes');

//Conexión a la base de datos
try {
    //await db.authenticate();
    db.sync()
    console.log('Conexión Correcta a la Base de datos')
} catch (error) {
    console.log(error)
}

// Crear la app
const app = express();

// cargar los archivos estaticos
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'public')));

// /habilitar ejs
// set-> para añadir 
app.set('view engine' ,'ejs');

// habilitar bodyParser para leer datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use(cors());

//API REST
// Routing
app.use('/pre', preSolicitudes);
//app.use('/', router());


// Definir un puerto y arrancar el proyecto
const port = 3000;
const host = 'https://apicrudtest2.herokuapp.com'
app.listen(port, host,() => {
    console.log(`El Servidor${host}está funcionando en el puerto ${port}`)
});