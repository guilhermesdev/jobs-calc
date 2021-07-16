module.exports = {
	getRemainingDays(job){
		// the 0 value is a fallback in case the
		// math operation returns a NaN value
		const remainingDays = +(job.total_hours/job.daily_hours).toFixed() || 0;
	
		const initialDate = new Date(job.created_at);
		const dueDay = initialDate.getDate() + remainingDays;
		const dueDateInMs = initialDate.setDate(dueDay);
	
		const timeDifferenceInMs = dueDateInMs - Date.now();
	
		const dayInMs = 1000 * 60 * 60 * 24;
		const dayDifference = +Math.ceil((timeDifferenceInMs / dayInMs));
	
		return +dayDifference;
	},
	calculateBudget(job, hourValue){
		return hourValue * job.total_hours;
	}
}