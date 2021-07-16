const Database = require('./config');

const initDb = {
	async init(){
		const db = await Database();
	
		await db.exec(`CREATE TABLE profile(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			avatar TEXT,
			monthly_budget INTEGER,
			days_per_week INTEGER,
			hours_per_day INTEGER,
			vacation_per_year INTEGER,
			hour_value REAL
		);`);
	
		await db.exec(`CREATE TABLE jobs(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			daily_hours INTEGER,
			total_hours INTEGER,
			created_at DATETIME
		);`);
	
		await db.run(`INSERT INTO profile(
			name,
			avatar,
			monthly_budget,
			days_per_week,
			hours_per_day,
			vacation_per_year,
			hour_value
		) VALUES (
			"Usuário",
			"https://avatars.dicebear.com/api/avataaars/${String(Math.random()).replace('.','')}.svg?background=%2371718c",
			3000,
			5,
			5,
			4,
			30
		);`);
	
		await db.run(`INSERT INTO jobs(
			name,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"Pizzaria Guloso",
			2,
			1,
			1617514376018
		);`);
	
		await db.run(`INSERT INTO jobs(
			name,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"OneTwo Project",
			3,
			47,
			1626117796832
		);`);
	
		await db.close();
	}
}

initDb.init();