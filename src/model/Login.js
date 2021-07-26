const Database = require('../db/config');
const bcrypt = require('bcrypt');''

module.exports = {
	async getUserId(email, loginPassword){
		const db = await Database();
		
		try {
			const { user_id, password } = await db.get(`
				SELECT user_id, password FROM users
				WHERE email = "${email}";
			`);

			const isPasswordCorrect = await bcrypt.compare(loginPassword, password);
	
			return isPasswordCorrect ? user_id : new Error('Email ou senha inválidos');
		} catch (err) {
			console.log(err);
			return new Error('Email ou senha inválidos');
		} finally {
			await db.close();
		}
	}
}