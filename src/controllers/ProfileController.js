const User = require('../model/User');

module.exports = {
	async index(req, res){
		return res.render('profile', { profile: await User.getProfile(req.userId) });
	},
	async update(req, res){
		const {
			vacation_per_year,
			hours_per_day,
			days_per_week,
			monthly_budget
		} = req.body;

		const WEEKS_PER_YEAR = 52;

		const weeksPerMonth = (WEEKS_PER_YEAR - +vacation_per_year) / 12;

		const weekTotalHours = +hours_per_day * +days_per_week;

		const monthlyTotalHours = weekTotalHours * weeksPerMonth;

		const hour_value = +monthly_budget / monthlyTotalHours;

		await User.updateProfile({
			...req.body,
			hour_value
		}, req.userId);

		return res.redirect('/profile');
	}
}