const Solicitudes = require('../models/Solicitudes');

exports.test = (req, res) =>{
  const msg = "<--------------Hola Consola soy el Test-------------->"
  console.log(msg);
  res.json({
    "cliente": {
      "tipo": "fisico",
      "fisica": {
        "nombre": "Neri Jose",
        "paterno": "",
        "materno": "Rincon Figueroa",
        "curp": "RIFN971021HNTNGR07"
      },
      "moral": {
        "razon_social": "Nerincon Corp S.A de C.V",
        "representante": "Luis Eduardo Rios"
      },
      "rfc": "RIFN971021J76",
      "email": "njrfguepardo@gmail.com",
      "celular": "3241058152"
    },
    "domicilio": {
      "calle": "Brasil",
      "interior": "47",
      "exterior": "0",
      "colonia": "Los Fresnos Pte",
      "c_postal": "63185",
      "poblacion": "Tepic",
      "estado": "Nayarit",
      "municipio": "Tepic"
    },
    "ine_fisico": "",
    "buro_fisico": "",
    "comprobante_domicilio": "",
    "situacion_fiscal": "_ Neri Rincón_.pdf",
    "ine_reprecentante": "_ Neri Rincón_.pdf",
    "buro_moral": "_ Neri Rincón_.pdf"
  });
}

exports.crearSolicitudPruebas = async (req, res) => {
  var formu = req.body.formulario;
  var arch = req.body.archivos;

  console.log('<*--------- Estamos en Crear (De Pruebas) ---------*>');
  console.log('<*--------- INICIO DEL req.body.formulario ---------*>');
  console.log(formu); //Bandera para los datos
  console.log('<*--------- FIN DEL req.body.formulario ---------*>');
  console.log('<*--------- INICIO DEL req.body.archivos ---------*>');
  console.log(arch); //Bandera para los datos
  console.log('<*--------- FIN DEL req.body.archivos ---------*>');

  return res.json({msg: "Ya díganle que revise la consola"});

}

exports.crearSolicitud = async (req, res) => {
    console.log('<*---Crear---*>');
    console.log(req.body); //Bandera para los datos

    var formu = req.body.formulario;
    var arch = req.body.archivos;


    if (!(JSON.stringify(formu)=='{}')) { //Si no se leen datos 

      console.log("<----Leí los datos--->");
      //console.log(req);
      console.log(formu);
      console.log(arch);
      

      
      // leer los datos
      formu.cliente_tipo = formu.cliente_tipo.substring(0, 1);
      formu.cliente_tipo= formu.cliente_tipo.toLowerCase();
      
      console.log(formu.cliente_tipo);
      console.log(formu.cliente_rfc);
      console.log(arch.documentacion_buro_fisico);
      console.log(arch.documentacion_buro_fisico.size);
      console.log(arch.documentacion_buro_fisico.name);

      if (formu.cliente_tipo == "f") {
        console.log("Vienen de fisico")
        //var ine_fisico = arch.ine_fisico[0].path; 
        var documentacion_ine_fisico = arch.documentacion_ine_fisico[0].path; 
        var documentacion_buro_fisico = arch.documentacion_buro_fisico[0].path; 
        var comprobante_domicilio = arch.comprobante_domicilio[0].path;

        var situacion_fiscal = "";
        var ine_reprecentante = "";
        var buro_moral = "";
      } else {
          console.log("<---Vienen de moral--->")
          
          var documentacion_ine_fisico = "";
          var documentacion_buro_fisico = "";
          var comprobante_domicilio = "";
   
          var situacion_fiscal = arch.situacion_fiscal[0].path;
          var ine_reprecentante = arch.ine_reprecentante[0].path;
          var buro_moral = arch.buro_moral[0].path;
      }
      //console.log();
      console.log(arch);
    } else {
      console.log("No estoy recibiendo datos");
      res.json({msg: "ERROR al crear Pre-Solicitud"});
    }

    try {
      console.log("Vamos a crear un registro");
      await Solicitudes.create({
        
        cliente_tipo : formu.cliente_tipo,
        cliente_nombre : formu.cliente_nombre, 
        cliente_paterno : formu.cliente_paterno, 
        cliente_materno : formu.cliente_materno, 
        cliente_razon_social : formu.cliente_razon_social, 
        cliente_representante : formu.cliente_representante, 
        cliente_rfc : formu.cliente_rfc, 
        cliente_curp : formu.cliente_curp, 
        cliente_email: formu.cliente_email, 
        cliente_celular : formu.cliente_celular, 
        domicilio_calle : formu.domicilio_calle, 
        domicilio_interior : formu.domicilio_interior, 
        domicilio_exterior : formu.domicilio_exterior, 
        domicilio_colonia : formu.domicilio_colonia, 
        domicilio_c_postal : formu.domicilio_c_postal, 
        domicilio_poblacion : formu.domicilio_poblacion, 
        domicilio_estado : formu.domicilio_estado, 
        domicilio_municipio : formu.domicilio_municipio,

        documentacion_ine_fisico,
        documentacion_buro_fisico,
        comprobante_domicilio,
        situacion_fiscal,
        ine_reprecentante,
        buro_moral
    })        
      res.json({mgs: "Presolicitud hecha"});
    } catch (error) {
      res.json(error + "Algo salió mal");
    }
}

exports.solicitudesShow = async (req, res) => {
  console.log(' <*---Show---*> ');
  console.log("Estás en solicitudes show");
  
  const solicitudesPromise = Solicitudes.findAll({
      attributes: ['id', 'cliente_tipo','cliente_nombre','cliente_paterno','cliente_materno','cliente_rfc','cliente_curp','cliente_email','cliente_celular']   
    });

  const [solicitudes] = await Promise.all([solicitudesPromise]);
  res.json(solicitudes)
}


exports.editar_solicitudes = async (req, res) => {
  console.log('<*---Editar---*>');
    console.log(req.params);
    const solicitudes_edit =  await Solicitudes.findByPk(req.params.id);
    res.json(solicitudes_edit)
    
    console.log(solicitudes_edit);
}

exports.updateSolicitud = async (req, res) => {
  console.log('<*---Actualizar---*>');
  console.log(formu); //Bandera para los datos
    
  var cliente = req.body.cliente.tipo;
  cliente = cliente.substring(0, 1); //Acortamiento del tipo de cliente a 1 solo caracter Fisico (f) / Moral (m)
  console.log(cliente); //Se corrobora el acortamiento de cliente tipo

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
  res.json({msg: "Pre-Solicitud Actualizada Con Éxito"});
}

exports.delete = async (req, res) => {
  console.log('<*---Borrar---*>');
    console.log(res.params);
    await Solicitudes.destroy({
        where: {
          id: req.params.id
        }
      });
  res.json({msg: "Pre-Solicitud Eliminada Con Éxito"});
}