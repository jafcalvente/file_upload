var fs = require('fs');
var path = require('path');

exports.index = function(req, res) {

	res.render('index', { title: 'Video-Upload'});
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

	console.log('Archivo subido --------------------');

	var cloudFilePath = /uploads/ + filename;

	res.render('play', { 
		title: 'Upload complete',
		privatePath: tempFilePath,
		publicPath: cloudFilePath
	});
};
