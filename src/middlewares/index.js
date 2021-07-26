require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
	auth(req, res, next){
		const { jwt_token } = req.cookies;
		if(!jwt_token){
			res.redirect('/login')
		} else {
			jwt.verify(jwt_token, process.env.JWT_SECRET, function(err, decoded){
				if (err) console.log(err.message);
	
				req.userId = decoded.id;
			})
			next();
		}
	}
}