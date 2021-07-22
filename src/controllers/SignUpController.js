const bcrypt = require('bcrypt');
const { logUser } = require('./LoginController');
const { verifyIfEmailExists, createUser } = require('../model/SignUp');

module.exports = {
	index(req, res){
		res.render('sign-up', { message: undefined });
	},
	async singUp(req, res){
		const { name, email, password1, password2 } = req.body;
		
		if (password1 !== password2){
			throw new Error('As senhas informadas são diferentes');
		}

		const passwordHash = await bcrypt.hash(password1, 10);

		try {
			const emailExists = await verifyIfEmailExists(email)

			if (emailExists) throw new Error('Este email já está cadastrado');	

			await createUser(name, email, passwordHash);

			await logUser(res, email, password1);

			res.redirect('/');
		} catch({ message }){
			res.render('sign-up', {
				message: {
					type: 'Erro',
					text: message
				}
			})
		}
	}
}