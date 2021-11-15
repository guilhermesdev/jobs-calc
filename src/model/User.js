const Database = require('../db/config');
const bcrypt = require('bcrypt');

const { randomAvatarImage } = require('../utils/UserUtils');

module.exports = {
	async getProfile(userId){
		const db = await Database();

		const data = await db.get(
			'SELECT * FROM users WHERE user_id = $userId',
			{ $userId: userId }
		);

		await db.close();

		return data;
	},
	async updateProfile(newData, userId){
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
	},
	async getId(email, loginPassword){
		const db = await Database();
		
		try {
			const { user_id, password } = await db.get(
				`SELECT user_id, password FROM users
				WHERE email = $email`,
				{ $email: email }
			);

			const isPasswordCorrect = await bcrypt.compare(loginPassword, password);
	
			return isPasswordCorrect ? user_id : new Error('Email ou senha inválidos');
		} catch (err) {
			return new Error('Email ou senha inválidos');
		} finally {
			await db.close();
		}
	},
	async create(name, email, passwordHash){
		const db = await Database();

		try{
			await db.run(
				`INSERT INTO users(
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
					$name,
					$email,
					$passwordHash,
					$avatarImage,
					3000,
					5,
					5,
					4,
					30
				);`,
				{
					$name: name,
					$email: email,
					$passwordHash: passwordHash,
					$avatarImage: randomAvatarImage()
				}
			);
		} catch {
			throw new Error('Não foi possível criar o usuário');
		} finally {
			await db.close();
		}
	}
}