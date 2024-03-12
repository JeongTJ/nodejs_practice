require("dotenv").config();
var getClient = require('../caching.js');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/auth', function(req, res, next) {
	res.redirect(`https://api.intra.42.fr/oauth/authorize?client_id=${process.env.PUBLIC_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A1234%2Fusers%2Flogin&response_type=code`);
});

router.get('/setter', async function(req, res, next) {
	try {
		console.log(getClient);
		const client = await getClient();
		if (req.query.key && req.query.data) {
			await client.set(req.query.key, req.query.data);
			res.send("add data");
		}
		else {
			res.send("실패");
		}
	} catch (error){
		console.log(error.message);
	}
});

router.get('/getter', async function(req, res, next) {
	try {
		const client = await getClient();
		if (req.query.key) {
			const data = await client.get(req.query.key);
			res.send(data);
		}
		else {
			res.send("실패");
		}
	} catch (error){
		console.log(error.message);
	}
});
module.exports = router;
