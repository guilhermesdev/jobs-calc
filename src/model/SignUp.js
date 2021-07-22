const Database = require('../db/config');

module.exports = {
	async verifyIfEmailExists(email){
		const db = await Database();

		const response = await db.get(`
			SELECT name FROM users WHERE email = "${email}";
		`);

		await db.close();
		return !!response;
	},
	async createUser(name, email, passwordHash){
		const db = await Database();

		try{
			await db.run(`INSERT INTO users(
				name,
				email,
				password,
				avatar,
				monthly_budget,
				days_per_week,
				hours_per_day,
				vacation_per_year,
				hour_value
			) VALUES (
				"${name}",
				"${email}",
				"${passwordHash}",
				"https://avatars.dicebear.com/api/avataaars/${String(Math.random()).replace('.','')}.svg?background=%2371718c",
				3000,
				5,
				5,
				4,
				30
			);`);
		} catch {
			throw new Error('Não foi possível criar o usuário');
		} finally {
			await db.close();
		}
	}
}