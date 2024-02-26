var express = require('express');
var request = require('request');
var {ClientCredentials , ResourceOwnerPassword , AuthorizationCode, config} = require('../auth.js');
var router = express.Router();
const oauth = require("simple-oauth2");

const axios = require('axios');

// API 엔드포인트 URL

// GET 요청 보내기


/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
	const client = new AuthorizationCode(config);
	accessToken = client.getToken({
		code: req.query.code,
		redirect_uri: 'http://13.124.198.32:1234/users/login'
	});
	accessToken.then(
		result => {
			const apiUrl = 'http://api.intra.42.fr/v2/me';
			console.log(result.token.access_token);
			axios.get(apiUrl, {
				headers:{
					Authorization: `Bearer ${result.token.access_token}`
				}
			})
			  .then((response) => {
				console.log('API 응답:', response);
			  })
			  .catch(error => {
				console.error('API 요청 실패:', error.message);
			  });
		},
		error => {
			console.log("=== error ===");
		}
	);
	res.send('로그인 성공');
  });

router.get('/request', function(req, res, next) {
	res.send("액세스 토큰");
});

module.exports = router;
