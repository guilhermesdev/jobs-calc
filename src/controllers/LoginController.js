const Login = require('../model/Login');

module.exports = {
	index(_req, res){
		res.render('login', { message: undefined });
	},
	async logUser(res, email, password, remember){
		const response = await Login.getUserId(email, password);
		
		if (response instanceof Error) throw response;
		
		if (remember) {
			res.cookie('id', response, {
				maxAge: 1296000000
			});
		} else {
			res.cookie('id', response);
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