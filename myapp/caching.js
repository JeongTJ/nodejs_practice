const {createClient} = require('redis');
require("dotenv").config();

const getClient = async function() {
	const client = await createClient({
		socket: {
		  port: process.env.REDIS_PORT
		}
	  })
	.on('error', err => console.log('Redis Client Error', err))
	.connect();
	return (client);
}

module.exports = getClient;
