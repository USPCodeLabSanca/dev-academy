const jwt = require("jsonwebtoken");

const secret="asdsasdsasdsasdqweqweqwe";

exports.validate = function(token){
	try{
		return jwt.verify(token, secret);
	} catch(e) {
		return null;
	}
}

exports.generateToken = function(email, expiresIn="12h"){
	return token = jwt.sign({email}, secret, {expiresIn});
}