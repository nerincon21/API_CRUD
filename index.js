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

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//A ver que pedo
//API REST
// Routing
app.use('/pre', preSolicitudes);
//app.use('/', router());


// Definir un puerto y arrancar el proyecto
const port = 4000;

app.listen(port,() => {
    console.log(`El Servidor está funcionando en el puerto ${port}`)
});