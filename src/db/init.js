const Database = require('./config');

const initDb = {
	async init(){
		const db = await Database();
	
		await db.exec(`CREATE TABLE users(
			user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			email TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			avatar TEXT NOT NULL,
			monthly_budget INTEGER NOT NULL,
			days_per_week INTEGER NOT NULL,
			hours_per_day INTEGER NOT NULL,
			vacation_per_year INTEGER NOT NULL,
			hour_value REAL NOT NULL
		);`);
	
		await db.exec(`CREATE TABLE jobs(
			job_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			name TEXT NOT NULL,
			user_id INTEGER NOT NULL,
			daily_hours INTEGER NOT NULL,
			total_hours INTEGER NOT NULL,
			created_at DATETIME NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users(user_id)
		);`);
	
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
			"Usuário",
			"user1@email.com",
			"senha123",
			"https://avatars.dicebear.com/api/avataaars/${String(Math.random()).replace('.','')}.svg?background=%2371718c",
			3000,
			5,
			5,
			4,
			30
		);`);
	
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
			"Usuário",
			"user2@email.com",
			"12345",
			"https://avatars.dicebear.com/api/avataaars/${String(Math.random()).replace('.','')}.svg?background=%2371718c",
			3000,
			5,
			5,
			4,
			30
		);`);
	
		await db.run(`INSERT INTO jobs(
			name,
			user_id,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"Pizzaria Guloso",
			1,
			2,
			1,
			1617514376018
		);`);
	
		await db.run(`INSERT INTO jobs(
			name,
			user_id,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"OneTwo Project",
			1,
			3,
			47,
			1626117796832
		);`);

		await db.run(`INSERT INTO jobs(
			name,
			user_id,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"Projeto Discover",
			2,
			3,
			47,
			1626117796832
		);`);
	
		await db.close();
	}
}

initDb.init();