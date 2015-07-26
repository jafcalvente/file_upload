var fs = require('fs');
var path = require('path');
var models = require('../models/models.js');

exports.index = function(req, res) {

	models.FileTable.findAll().then( function(files) {
		res.render('index', { 
			files: files || []
		});
	});
};

exports.upload = function(req, res) {

	var filePath = req.files.file.path;
	var filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
	console.log('Local path:' + filePath);

	var tempFilePath = path.join(__dirname, '../public/uploads/') + filename;
	console.log('Path:' + tempFilePath);

	var is = fs.createReadStream(filePath);
	var os = fs.createWriteStream(tempFilePath);

	is.pipe(os);

	is.on('end', function() {

		// Eliminamos el archivo temporal
		fs.unlinkSync(filePath);
	});

	var cloudFilePath = /uploads/ + filename;

	var fileObject = models.FileTable.build({
		name: filename,
		path: cloudFilePath
	});

	fileObject.save({ fields: ['name', 'path']})
	.then(function() {
		models.FileTable.findAll().then( function(files) {
			res.render('index', { 
				files: files || []
			});
		});
	});

};

exports.play = function(req, res) {

	// Buscar el elemento fichero a eliminar a partir de su identificador en la BBDD
	models.FileTable.find({ where: { id: Number(req.params.fileId)}})
	.then( function(file) {
		res.render('play', { 
			name: file.name,
			publicPath: file.path
		});
	});
};

exports.delete = function(req, res) {

	// Buscar el elemento fichero a eliminar a partir de su identificador en la BBDD
	models.FileTable.find({ where: { id: Number(req.params.fileId)}})
	.then( function(file) {

		// Eliminar el fichero
		var filePath = path.join(__dirname, '../public/uploads/') + file.name;
		fs.unlink(filePath, function(error) {
			if (error) throw error;
			console.log('Successfully deleted ' + filePath);

			// Eliminar el elemento fichero en la BBDD
			file.destroy().then( function() {

				// Recuperar la lista de todos los ficheros actualizada
				models.FileTable.findAll().then( function(files) {
					res.render('index', { 
						files: files || []
					});
				});
			});
		});
	});
};
