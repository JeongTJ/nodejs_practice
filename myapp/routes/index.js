require("dotenv").config();
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth', function(req, res, next) {
	res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.PUBLIC_ID}&redirect_uri=http%3A%2F%2F13.124.198.32%3A1234%2Fusers%2Flogin&response_type=code`);
});

router.get('/oauth/token', function(req, res, next) {
	res.send("Test");
});

module.exports = router;
