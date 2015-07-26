var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null, { dialect: 'sqlite', storage: 'file.sqlite'});

// Exportar la definición de la tabla File desde file.js
var FileTable = sequelize.import(path.join(__dirname, 'file'));
exports.FileTable = FileTable;

// Crear e instanciar BBDD con el método sync
sequelize.sync().then( function() { console.log('Base de datos inicializada') });
