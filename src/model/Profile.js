const Database = require('../db/config');

module.exports = {
	async get(userId){
		const db = await Database();

		const data = await db.get(
			'SELECT * FROM users WHERE user_id = $userId',
			{ $userId: userId }
		);

		await db.close();

		return data;
	},
	async update(newData, userId){
		const db = await Database();

		await db.run(
			`UPDATE users SET
				name = $name,
				avatar = $avatar,
				monthly_budget = $monthlyBudget,
				days_per_week = $daysPerWeek,
				hours_per_day = $hoursPerDay,
				vacation_per_year = $vacationPerYear,
				hour_value = $hourValue
			WHERE
				user_id = $userId;`,
			{
				$name: newData.name,
				$avatar: newData.avatar,
				$monthlyBudget: +newData.monthly_budget,
				$daysPerWeek: +newData.days_per_week,
				$hoursPerDay: +newData.hours_per_day,
				$vacationPerYear: +newData.vacation_per_year,
				$hourValue: +newData.hour_value,
				$userId: userId
			}
		);
		
		await db.close();
	}
}