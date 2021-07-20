const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
	async index(req, res){
		const userId = req.cookies.id;
		
		const jobs = await Job.get(userId);
		const profile = await Profile.get(userId);

		const statusCounter = {
			progress: 0,
			done: 0,
			total: jobs.length
		}

		let jobsTotalHours = 0;

		const updatedJobs = jobs.map(job => {
			const remaining = JobUtils.getRemainingDays(job);
			const status = remaining <= 0 ? 'done' : 'progress';

			statusCounter[status]++;

			status === 'progress' && (jobsTotalHours += +job.daily_hours);

			return {
				...job,
				remaining,
				status,
				budget: JobUtils.calculateBudget(job, profile.hour_value)
			}
		});

		const freeHours = profile.hours_per_day - jobsTotalHours;

		res.render('index', {
			jobs: updatedJobs,
			profile,
			statusCounter,
			freeHours
		});
	},
}