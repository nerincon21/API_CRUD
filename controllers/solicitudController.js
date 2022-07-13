const Solicitudes = require('../models/Solicitudes');

exports.test = (req, res) =>{
  const msg = "<--------------Hola Postman-------------->"
  console.log(msg);
}

exports.crearSolicitud = async (req, res) => {
    console.log('Hola Crear');
    console.log(req.body);
    
    // leer los datos
     console.log(req.body.cliente);
    var cliente = req.body.cliente.tipo;
    cliente = cliente.substring(0, 1);
    
    
    console.log("Leí los datos");
    //console.log(req.body.cliente.fisica.curp);
    console.log(cliente);

        Solicitudes.create({
            cliente, 
          
            nombre : req.body.cliente.fisica.nombre, 
            paterno : req.body.cliente.fisica.paterno, 
            materno : req.body.cliente.fisica.materno, 
            razon_social : req.body.cliente.moral.razon_social, 
            representante : req.body.cliente.moral.representante, 
            rfc : req.body.cliente.rfc, 
            curp : req.body.cliente.fisica.curp, 
            email: req.body.cliente.email, 
            celular : req.body.cliente.celular, 
            calle : req.body.domicilio.calle, 
            interior : req.body.domicilio.interior, 
            exterior : req.body.domicilio.exterior, 
            colonia : req.body.domicilio.colonia, 
            c_postal : req.body.domicilio.c_postal, 
            poblacion : req.body.domicilio.poblacion, 
            estado : req.body.domicilio.estado, 
            municipio : req.body.domicilio.municipio,
            /*ine_fisico, buro_fisico, comprobante_domicilio, situacion_fiscal, ine_representante, buro_moral*/
        })        
        // redirigir al usuario
        //req.flash('correcto', 'Presolicitud Hecha');
        
}

exports.solicitudesShow = async (req, res) => {
  console.log('Hola show');
    //console.log(req.body);
    console.log("Estás en solicitudes show");
    const solicitudesPromise = Solicitudes.findAll({
        attributes: ['id', 'cliente','nombre','paterno','materno','rfc','curp','email','celular']   
      });

    const [solicitudes] = await Promise.all([solicitudesPromise]);
//    console.log(solicitudes);
    //console.log(solicitudes)
    // render a la vista   
}

// Me mande el ID 
exports.editar_solicitudes = async (req, res) => {
  console.log('Hola edit');
    console.log(req.params);
    // const solicitudes_edit =  await Solicitudes.findByPk();
    const solicitudes_edit =  await Solicitudes.findByPk(req.params.id);
   
    
    console.log(solicitudes_edit);
}

exports.updateSolicitud = async (req, res) => {
  console.log('Hola update');
    const ricuest = req.body;
    console.log('--------------------------Riquest----------------------');
    console.log(ricuest);
    
    var cliente = req.body.cliente.tipo;
    cliente = cliente.substring(0, 1);

/*     await User.update({ lastName: "Doe" }, {
        where: {
          lastName: null
        }
      }); */


    await Solicitudes.update({ 

        cliente, 
        
        nombre : req.body.cliente.fisica.nombre, 
        paterno : req.body.cliente.fisica.paterno, 
        materno : req.body.cliente.fisica.materno, 
        razon_social : req.body.cliente.moral.razon_social, 
        representante : req.body.cliente.moral.representante, 
        rfc : req.body.cliente.rfc, 
        curp : req.body.cliente.fisica.curp, 
        email: req.body.cliente.email, 
        celular : req.body.cliente.celular, 
        calle : req.body.domicilio.calle, 
        interior : req.body.domicilio.interior, 
        exterior : req.body.domicilio.exterior, 
        colonia : req.body.domicilio.colonia, 
        c_postal : req.body.domicilio.c_postal, 
        poblacion : req.body.domicilio.poblacion, 
        estado : req.body.domicilio.estado, 
        municipio : req.body.domicilio.municipio,
        /*ine_fisico, buro_fisico, comprobante_domicilio, situacion_fiscal, ine_representante, buro_moral*/

        }, {
        where: {
          id: req.body.cliente.id
        }
      });

}

exports.delete = async (req, res) => {
    const respuntoparams = res.params;
    console.log(respuntoparams);

    await Solicitudes.destroy({
        where: {
          id: req.params.id
        }
      });
}