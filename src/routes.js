const express = require('express');
const routes = express.Router();

const DashboardController = require('./controllers/DashboardController');
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const LoginController = require('./controllers/LoginController');
const { authWithCookies } = require('./middlewares');

routes
	.get('/', authWithCookies, DashboardController.index)
	.get('/login', LoginController.index)
	.post('/login', LoginController.login)
	.get('/job', authWithCookies, JobController.create)
	.post('/job', authWithCookies, JobController.save)
	.get('/job/:id', authWithCookies, JobController.show)
	.post('/job/:id', authWithCookies, JobController.update)
	.post('/job/delete/:id', authWithCookies, JobController.delete)
	.get('/profile', authWithCookies, ProfileController.index)
	.post('/profile', authWithCookies, ProfileController.update)
;

module.exports = routes;