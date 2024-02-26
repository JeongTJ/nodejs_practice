require("dotenv").config();

const  config  =  {
	client : {
	  id : process.env.PUBLIC_ID,
	  secret : process.env.PRIVATE_KEY
	} ,
	auth : {
	  tokenHost : 'https://api.intra.42.fr'
	}
  } ;

  const  { ClientCredentials , ResourceOwnerPassword , AuthorizationCode }  =  require ( 'simple-oauth2' ) ;

  module.exports = {ClientCredentials , ResourceOwnerPassword , AuthorizationCode, config};
