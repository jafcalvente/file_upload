var express = require('express');
var router = express.Router();
var fileController = require('../controllers/file_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/fileUpload', fileController.index);
router.post('/fileUpload', fileController.upload);
router.get('/fileUpload/:fileId(\\d+)', fileController.play);
router.get('/fileUpload/delete/:fileId(\\d+)', fileController.delete);

module.exports = router;
