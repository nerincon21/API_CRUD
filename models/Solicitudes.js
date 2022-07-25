const Sequelize = require('sequelize');
const mysql2 = require('mysql2');
const db = require('../config/db');


const Solicitudes = db.define('solicitudes', {
    id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    cliente :  Sequelize.STRING(10),


    nombre :  {  
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    paterno :  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    materno :  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    
    //Persona Moral
    razon_social :  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    representante : {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    rfc :  {
        
        type: Sequelize.STRING(13),
        defaultValue: null
    },


    curp :  {
        
        type: Sequelize.STRING(18),
        defaultValue: null
    },


    email:  {
        
        type: Sequelize.STRING(100),
        defaultValue: null
    },


    celular:  {
        
        type: Sequelize.BIGINT(20),
        defaultValue: null
    },

    //Domicilio
    calle : {
        
        type: Sequelize.STRING(100),
        allowNull: false, 
    },


    interior : {
        
        type: Sequelize.INTEGER(6),
        allowNull: false, 
    },


    exterior : {
        
        type: Sequelize.STRING(10),
        defaultValue: null
    },


    colonia : {
        
        type: Sequelize.STRING(50),
        allowNull: false, 
    },


    c_postal : {
        
        type: Sequelize.INTEGER(5),
        allowNull: false, 
    },


    poblacion : {
        
        type: Sequelize.STRING(100),
        allowNull: false, 
    },


    estado : {
        
        type: Sequelize.STRING(50),
        allowNull: false, 
    },


    municipio : {
        
        type: Sequelize.STRING(100),
        allowNull: false 
    },
    ine_fisico:{
        type: Sequelize.STRING(100),
        defaultValue: null
    },

    buro_fisico:{
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