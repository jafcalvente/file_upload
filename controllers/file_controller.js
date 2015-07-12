var fs = require('fs');

exports.index = function(req, res) {

	res.render('index', { title: 'Video-Upload'});
};

exports.upload = function(req, res) {

	var path = req.files.file.path;
	console.log('Path:' + path);

	var filename = path.substring(path.lastIndexOf('/') + 1, path.length);

	var newPath = '/Users/Jose/Desktop/files/' + filename;
	console.log('Path:' + newPath);

	var is = fs.createReadStream(path);
	var os = fs.createWriteStream(newPath);

	is.pipe(os);

	is.on('end', function() {

		// Eliminamos el archivo temporal
		fs.unlinkSync(path);
	});

	console.log('Archivo subido --------------------');

	res.render('index', { title: 'Upload complete'});
};
