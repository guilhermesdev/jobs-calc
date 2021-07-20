const Database = require('../db/config');

module.exports = {
	async get(userId, jobId){
		const db = await Database();

		let data;

		if(!jobId){
			data = await db.all(`SELECT * FROM jobs WHERE user_id = ${userId}`);
		} else {
			data = await db.get(`SELECT * FROM jobs WHERE user_id = ${userId} AND job_id = ${jobId}`)
		}

		await db.close();

		return data;
	},
	async update(job, jobId){
		const db = await Database();

		await db.run(`UPDATE jobs SET
			name = "${job.name}",
			daily_hours = ${job.daily_hours},
			total_hours = ${job.total_hours}
			WHERE job_id = ${jobId};
		`);

		await db.close();
	},
	async delete(id, userId){
		const db = await Database();

		await db.run(`DELETE FROM jobs WHERE job_id = ${id} AND user_id = ${userId}`);

		await db.close();
	},
	async create(newJob){
		const db = await Database();

		await db.run(`INSERT INTO jobs(
			name,
			user_id,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"${newJob.name}",
			${newJob.user_id},
			${newJob.daily_hours},
			${newJob.total_hours},
			${newJob.created_at}
		);`)

		await db.close();
	}
}