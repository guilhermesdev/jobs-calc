const Database = require('../db/config');

module.exports = {
	async getUserId(email, password){
		const db = await Database();

		const { user_id } = await db.get(`
			SELECT user_id FROM users
			WHERE email = "${email}" AND password = "${password}";
		`);

		await db.close();

		return user_id;
	}
}