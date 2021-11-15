const User = require('../model/User');
const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');

module.exports = {
	create(_req, res){
		return res.render('job');
	},
	async save(req, res){
		await Job.create({
			...req.body,
			user_id: req.userId,
			created_at: Date.now()
		});

		return res.redirect('/');
	},
	async show(req, res){
		const userId = req.userId;

		const profile = await User.getProfile(userId);

		const job = await Job.get(userId, req.params.id);

		if (!job) return res.send('Job não encontrado :(');

		job.budget = JobUtils.calculateBudget(job, profile.hour_value)

		return res.render('job-edit', { job });
	},
	async update(req, res){
		const jobId = +req.params.id;

		const updatedJob = {
			...req.body
		}
		
		await Job.update(updatedJob, jobId);
		
		return res.redirect('/');
	},
	async delete(req, res){
		const jobId = +req.params.id;

		await Job.delete(jobId, +req.userId);

		return res.redirect('/');
	}
}