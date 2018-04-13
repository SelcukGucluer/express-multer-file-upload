var express = require('express');
var router = express.Router()
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));

var storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, 'uploads')
},
filename: function (req, file, cb) {
cb(null, file.originalname)
}
})

var upload = multer({ storage: storage }).array("file",12)

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
	console.log('Time: ', Date.now())
	next()
})

// define the home page route
router.get('/', function (req, res) {
	res.send('Birds home page')
})

// define the about route
router.get('/about', function (req, res) {
	res.send('About birds')
})


router.post('/', function (req, res) {

	upload(req, res, function (err) {
		if (err) {
		// An error occurred when uploading
		return
	}

	var files = req.files;
	
	if (Array.isArray(files)) {
	// response with multiple files (old form may send multiple files)
		console.log("Got " + files.length + " files");
	}
	else {
		// dropzone will send multiple requests per default
		console.log("Got one file");
	}
	
res.sendStatus(200);
});



});


module.exports = router;