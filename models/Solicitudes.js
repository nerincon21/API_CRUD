const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const db = require('../config/db');


const Solicitudes = db.define('solicitudes', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    cliente_tipo :  Sequelize.STRING(10),


    cliente_nombre :  {  
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    cliente_paterno :  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    cliente_materno :  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    
    //Persona Moral
    cliente_razon_social :  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    cliente_representante : {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    cliente_rfc :  {
        
        type: Sequelize.STRING(13),
        defaultValue: null
    },


    cliente_curp :  {
        
        type: Sequelize.STRING(18),
        defaultValue: null
    },


    cliente_email:  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    cliente_celular:  {
        
        type: Sequelize.BIGINT(20),
        defaultValue: null
    },

    //Domicilio
    domicilio_calle : {
        
        type: Sequelize.STRING(100),
        allowNull: false, 
    },


    domicilio_interior : {
        
        type: Sequelize.INTEGER(6),
        allowNull: false, 
    },


    domicilio_exterior : {
        
        type: Sequelize.STRING(10),
        defaultValue: null
    },


    domicilio_colonia : {
        
        type: Sequelize.STRING(50),
        allowNull: false, 
    },


    domicilio_c_postal : {
        
        type: Sequelize.INTEGER(5),
        allowNull: false, 
    },


    domicilio_poblacion : {
        
        type: Sequelize.STRING(100),
        allowNull: false, 
    },


    domicilio_estado : {
        
        type: Sequelize.STRING(50),
        allowNull: false, 
    },


    domicilio_municipio : {
        
        type: Sequelize.STRING(100),
        allowNull: false 
    },
    documentacion_ine_fisico:{
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    documentacion_buro_fisico:{
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    comprobante_domicilio:{
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    situacion_fiscal:{
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    ine_reprecentante:{
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    buro_moral:{
        type: Sequelize.STRING(100),
        defaultValue: null
    }

});
console.log("Hola desde el modelo crud_api");
module.exports = Solicitudes;