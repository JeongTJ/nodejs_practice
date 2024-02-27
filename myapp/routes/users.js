require("dotenv").config();
var express = require('express');
var {ClientCredentials , ResourceOwnerPassword , AuthorizationCode, config} = require('../auth.js');
var jwt = require("jsonwebtoken");
var router = express.Router();
const oauth = require("simple-oauth2");

const axios = require('axios');

/* GET users listing. */
router.get('/', async function(req, res, next) {
	try {
		const apiUrl = 'http://13.124.198.32:4242/test'
		const headers = {
			'id' : 1,
			'nickname' : "tajeong"
		};
		const response = await axios.get(apiUrl, {
			headers
		});
		console.log(response.data);
		res.send(response.data);
	} catch (error) {
		console.log(error.message);
	}
});

router.get('/test', async function(req, res, next) {
	try {
		console.log(req.query);
		res.json({
			id : 1,
			"massage" : "hello i'm tajeong"
		});
		res.send(req.headers);
	} catch (error) {
		console.log(error.message);
	}
});

router.post('/test', async function(req, res, next) {
	try {
		console.log(req.headers);
		res.json({
			id : 1,
			"massage" : "hello i'm tajeong"
		});
		res.send(req.headers);
	} catch (error) {
		console.log(error.message);
	}
});

router.get('/login', async function(req, res, next) {
	try {
		const client = new AuthorizationCode(config);
		const accessToken = await client.getToken({
			code: req.query.code,
			redirect_uri: 'http://13.124.198.32:1234/users/login'
		});
		const apiUrl = 'http://api.intra.42.fr/v2/me';
		const response = await axios.get(apiUrl, {
			headers:{
				Authorization: `Bearer ${accessToken.token.access_token}`
			}});
		const key = process.env.SECRET_KEY + "salt";
		let token = "";
		token = jwt.sign(
			{
				type: "JWT",
				nickname: response.data.first_name,
				profile: response.data.last_name,
			},
			key,
			{
				expiresIn: "15m", // 15분후 만료
				issuer: "tajeong",
			}
		  );
		res.send(token);
		return res.status(200).json({
			code: 200,
			message: "token is created",
			token: token,
		});
		// res.send(response.data);
	} catch (error){
		console.log(error.message);
	}
});

router.get('/request', function(req, res, next) {
	res.send("액세스 토큰");
});

module.exports = router;
