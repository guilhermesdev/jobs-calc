require('dotenv').config();
const Login = require('../model/Login');
const jwt = require('jsonwebtoken');

module.exports = {
	index(_req, res){
		res.clearCookie('jwt_token');
		res.render('login', { message: undefined });
	},
	async logUser(res, email, password, remember){
		const response = await Login.getUserId(email, password);
		
		const EXPIRATION_TIME = 1296000; // == 15 * 24 * 60 * 60 == 15 days in seconds

		if (response instanceof Error) throw response;
		
		const token = jwt.sign(
			{ id: response },
			process.env.JWT_SECRET,
			{ expiresIn: EXPIRATION_TIME }
		)

		if (remember) {
			return res.cookie('jwt_token', token, {
				maxAge: EXPIRATION_TIME * 1000, // transforming in milliseconds
				httpOnly: true
			});
		} else {
			return res.cookie('jwt_token', token, {
				httpOnly: true
			});
		}
	},
	async login(req, res){
		const { email, password, remember } = req.body;
		
		try {
			await module.exports.logUser(res, email, password, remember);
			res.redirect('/');
		} catch({ message }) {
			res.render('login', {
				message: {
					type: 'Erro',
					text: message
				}
			})			
		}				
	}
}