const Database = require('../db/config');

module.exports = {
	async get(userId, jobId){
		const db = await Database();

		let data;

		if(!jobId){
			data = await db.all(
				`SELECT * FROM jobs WHERE user_id = $userId`,
				{ $userId: userId }
			);
		} else {
			data = await db.get(
				`SELECT * FROM jobs WHERE user_id = $userId AND job_id = $jobId`,
				{
					$userId: userId,
					$jobId: jobId
				}
			);
		}

		await db.close();

		return data;
	},
	async update(job, jobId){
		const db = await Database();

		await db.run(
			`UPDATE jobs SET
			name = $name,
			daily_hours = $dailyHours,
			total_hours = $totalHours
			WHERE job_id = $jobId;`,
			{
				$name: job.name,
				$dailyHours: job.daily_hours,
				$totalHours: job.total_hours,
				$jobId: jobId
			}
		);

		await db.close();
	},
	async delete(id, userId){
		const db = await Database();

		await db.run(
			`DELETE FROM jobs WHERE job_id = $id AND user_id = $userId`,
			{
				$id: id,
				$userId: userId
			}
		);

		await db.close();
	},
	async create(newJob){
		const db = await Database();

		await db.run(
			`INSERT INTO jobs(
				name,
				user_id,
				daily_hours,
				total_hours,
				created_at
			) VALUES (
				$name,
				$userId,
				$dailyHours,
				$totalHours,
				$createdAt
			);`,
			{
				$name: newJob.name,
				$userId: newJob.user_id,
				$dailyHours: newJob.daily_hours,
				$totalHours: newJob.total_hours,
				$createdAt: newJob.created_at
			}
		);

		await db.close();
	}
}