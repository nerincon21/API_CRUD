const express = require('express');
const cors = require('cors');
const path = require('path');
//const router = require('./routes/preSolicitudes');
const bodyParser = require('body-parser');
const preSolicitudes = require('./routes/preSolicitudes.js');
const multer = require('multer');


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

//Configurar cambio de nombre de archivo subido
const storage = multer.diskStorage({
    
    destination: path.join(__dirname, '/public/pdf'), //configurar la ruta donde se guardará el archivo
    //enconding,
    filename: (req, file, cb) => {
        /*cb(null, file.originalname) //Configurar el nombre del archivo a subirse */
        cb(null, Date.now() +'-' + Math.random()+ path.extname(file.originalname));

    }
})

//Configurar Multer
app.use(multer({
    storage : storage, //usar la configuración del storage para cambiar los nombres
    dest: path.join(__dirname, '/public/pdf'), //configurar la ruta donde se guardará el archivo
    //limits: {fileSize: 1000} //1B, 1000B = 1kB, 1000000 = 1Mb
    fileFilter : (req,file,cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb (null, true);            
        }   
        cb("Error: La extensión del archivo no es válida");
    }
}).fields([
    {name: "ine_fisico", maxCount: 1},
    {name: "buro_fisico", maxCount: 1},
    {name: "comprobante_domicilio", maxCount: 1},
    {name: "situacion_fiscal", maxCount: 1},
    {name: "ine_reprecentante", maxCount: 1},
    {name: "buro_moral", maxCount: 1}])
    );

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


//API REST
// Routing
app.use('/pre', preSolicitudes);
//app.use('/', router());


// Definir un puerto y arrancar el proyecto
const port = 6000;

app.listen(port,() => {
    console.log(`El Servidor está funcionando en el puerto ${port}`)
});