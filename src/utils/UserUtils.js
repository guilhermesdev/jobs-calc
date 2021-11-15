const Database = require('../db/config');

module.exports = {
	async verifyIfEmailExists(email){
		const db = await Database();

		const response = await db.get(
			`SELECT name FROM users WHERE email = $email;`,
			{ $email: email }
		);

		await db.close();
		return !!response;
	},
	randomAvatarImage() {
		const number = String(Math.random()).replace('.', '');
	
		return `https://avatars.dicebear.com/api/avataaars/${number}.svg?background=%2371718c`;
	}
}