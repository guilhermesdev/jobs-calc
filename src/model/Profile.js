const Database = require('../db/config');

module.exports = {
	async get(userId){
		const db = await Database();

		const data = await db.get(`SELECT * FROM users WHERE user_id = ${userId}`);

		await db.close();

		return data;
	},
	async update(newData, userId){
		const db = await Database();

		await db.run(`UPDATE users SET
			name = "${newData.name}",
			avatar = "${newData.avatar}",
			monthly_budget = ${+newData.monthly_budget},
			days_per_week = ${+newData.days_per_week},
			hours_per_day = ${+newData.hours_per_day},
			vacation_per_year = ${+newData.vacation_per_year},
			hour_value = ${+newData.hour_value}
			WHERE user_id = ${userId};
		`);
		
		await db.close();
	}
}