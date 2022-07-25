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

exports.crearSolicitud = async (req, res) => {
    console.log('<*---Crear---*>');
    console.log(req.body); //Bandera para los datos

    if (!(JSON.stringify(req.body)=='{}')) { //Si no se leen datos 

      console.log("<----Leí los datos--->");
      console.log(req.body);
      console.log(req.files);
      
      
      // leer los datos
      var cliente = req.body.cliente.tipo;
      cliente = cliente.substring(0, 1);
      
      console.log(req.body.cliente.tipo);
      console.log(req.body.cliente.rfc);

      var ine_fisico = "";
      var buro_fisico = "";
      var comprobante_domicilio = "";
      var situacion_fiscal = "";
      var ine_representante = "";
      var buro_moral = "";
  
      if (cliente == "f") {

        //if (req.files.ine_fisico){
        console.log("Vienen de fisico")
    
        ine_fisico = req.files.ine_fisico[0].path; 
        buro_fisico = req.files.buro_fisico[0].path; 
        comprobante_domicilio = req.files.comprobante_domicilio[0].path;
          
      } else {
    
          console.log("Vienen de moral")
   
          situacion_fiscal = req.files.situacion_fiscal[0].path;
          ine_representante = req.files.ine_reprecentante[0].path;
          buro_moral = req.files.buro_moral[0].path;
    
      }
  
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
  
          ine_fisico,
          buro_fisico,
          comprobante_domicilio,
          situacion_fiscal,
          ine_representante,
          buro_moral
  
      })        
  
      //console.log();
      console.log(req.files);

    res.json({msg: "Pre-Solicitud Creada Con Éxito"});

    } else {
      console.log("No estoy recibiendo datos");
      //res.json({msg: "Error al crear Pre-Solicitud Creada Con Exito"});
      return;
    }

  

}

exports.solicitudesShow = async (req, res) => {
  console.log(' <*---Show---*> ');
  console.log("Estás en solicitudes show");
  
  const solicitudesPromise = Solicitudes.findAll({
      attributes: ['id', 'cliente','nombre','paterno','materno','rfc','curp','email','celular']   
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
  console.log(req.body); //Bandera para los datos
    
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