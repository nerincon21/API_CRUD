const express = require('express');
const router =  express.Router();
const db = require('../config/db');

// importar controlador
const solicitudController = require('../controllers/solicitudController');

    router.get('/test', solicitudController.test);


    //vista mostrar solicitudes
    router.get('/show', solicitudController.solicitudesShow);
    
    //añadir solicitud
    router.post('/solicitudes', solicitudController.crearSolicitud);

    // editar solicitudes
    router.get('/solicitud_edit/:id', 
        solicitudController.editar_solicitudes
    )

    //actualizar solicitud
    router.post('/update', solicitudController.updateSolicitud);
    
    // eliminar solicitudes
    router.post('/delete/:id', solicitudController.delete);

    

   

module.exports = router;