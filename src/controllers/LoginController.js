const Login = require('../model/Login');

// - [ ] Use bcrypt to save password hash on database
// - [ ] Use JWT instead of a simple cookie
// - [ ] Improve login methods

module.exports = {
	index(_req, res){
		res.render('login');
	},
	async login(req, res){
		const { remember, email, password } = req.body;

		const user_id = Login.getUserId(email, password);

		if (remember) {
			res.cookie('id', user_id, {
				maxAge: 1296000000
			});
		} else {
			res.cookie('id', user_id);
		}

		res.redirect('/');
	}
}